const { Router } = require("express");
const { z } = require("zod");
const { sendOtp, verifyOtp, generateOtp } = require("../services/otpService");
const {
  createSession,
  cookieOptions,
  COOKIE_NAME,
} = require("../middleware/session");
const { getDb } = require("../config/db");

const router = Router();

// Validation schemas
const sendOtpSchema = z.object({
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Invalid mobile number. Must be 10 digits."),
});

const verifyOtpSchema = z.object({
  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Invalid mobile number. Must be 10 digits."),
  otp: z.string().length(6, "OTP must be 6 digits."),
});

router.post("/send-otp", async (req, res, next) => {
  try {
    const result = sendOtpSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }

    const { mobileNumber } = result.data;
    const otp = generateOtp();
    await sendOtp(mobileNumber, otp);

    return res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    next(error);
  }
});

router.post("/verify-otp", async (req, res, next) => {
  try {
    const result = verifyOtpSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: result.error.issues[0].message });
    }

    const { mobileNumber, otp } = result.data;

    // Verify OTP
    const isValid = await verifyOtp(mobileNumber, otp);
    if (!isValid) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    const db = getDb();
    const usersCollection = db.collection("users");
    const joinRequestsCollection = db.collection("join_requests");

    // 1. Check/Create User
    let user = await usersCollection.findOne({ mobileNumber });
    if (!user) {
      user = {
        mobileNumber,
        uid: "mock-uid-" + Date.now(),
        role: "user",
        createdAt: new Date(),
        firstName: "User",
      };
      const insertResult = await usersCollection.insertOne(user);
      user._id = insertResult.insertedId;
    }

    // 2. Link Join Request
    const joinRequest = await joinRequestsCollection.findOne({ mobileNumber });
    if (joinRequest) {
      const updateData = { joinRequestId: joinRequest._id };

      // Copy name if available and not set
      if (joinRequest.fullName) {
        const nameParts = joinRequest.fullName.trim().split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.slice(1).join(" ");

        user.firstName = firstName;
        user.lastName = lastName;

        updateData.firstName = firstName;
        updateData.lastName = lastName;
      }

      await usersCollection.updateOne({ _id: user._id }, { $set: updateData });
      user.joinRequestId = joinRequest._id;
    }

    // 3. Create Session & Cookie
    const sessionUser = { ...user, id: user._id.toString() };
    const { id } = createSession(sessionUser);
    res.cookie(COOKIE_NAME, id, cookieOptions());

    return res.json({
      success: true,
      message: "Logged in successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", (req, res) => {
  const { getSession, COOKIE_NAME } = require("../middleware/session");
  const sid = req.cookies?.[COOKIE_NAME];

  if (!sid) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const session = getSession(sid);
  if (!session) {
    res.clearCookie(COOKIE_NAME);
    return res.status(401).json({ error: "Session expired" });
  }

  return res.json({
    success: true,
    user: session.user,
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ success: true, message: "Logged out successfully" });
});

module.exports = router;
