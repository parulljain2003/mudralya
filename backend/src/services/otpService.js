const otpStore = new Map();

/**
 * Generate a 6-digit OTP
 */
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP via Console (Mock)
 */
const sendOtp = async (mobileNumber, otp) => {
  // Store OTP with expiration (5 minutes)
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore.set(mobileNumber, { otp, expiresAt });

  // eslint-disable-next-line no-console
  console.log(`\n[OTP SERVICE] OTP for ${mobileNumber}: ${otp}\n`);

  return true; // Success
};

/**
 * Verify OTP
 */
const verifyOtp = async (mobileNumber, otp) => {
  const record = otpStore.get(mobileNumber);

  if (!record) {
    return false; // No OTP found
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(mobileNumber);
    return false; // Expired
  }

  if (record.otp === otp) {
    otpStore.delete(mobileNumber); // Clear after successful use
    return true;
  }

  return false; // Invalid OTP
};

module.exports = {
  generateOtp,
  sendOtp,
  verifyOtp,
};
