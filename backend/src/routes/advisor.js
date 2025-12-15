const { Router } = require('express');
const { z } = require('zod');
const { persistDocument } = require('../utils/persistence');
const { adminSession } = require('../middleware/session');
const { getDb } = require('../config/db');
const { ObjectId } = require('mongodb');

const router = Router();

router.delete('/:id', adminSession, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const result = await getDb().collection('advisor_applications').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Entry not found' });
    }

    return res.json({ message: 'Entry deleted successfully', success: true });
  } catch (err) {
    return next(err);
  }
});

const advisorSchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Full name must be at least 2 characters')
    .max(50, 'Full name must be less than 50 characters'),
  mobileNumber: z
    .string({ required_error: 'Mobile number is required' })
    .trim()
    .regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'),
  emailId: z
    .string({ required_error: 'Email is required' })
    .trim()
    .email('Please enter a valid email address')
    .max(100, 'Email must be less than 100 characters'),
  dateOfBirth: z
    .string({ required_error: 'Date of birth is required' })
    .refine((value) => {
      const date = new Date(value);
      return !Number.isNaN(date.getTime()) && date <= new Date();
    }, 'Date of birth must be a valid past date'),
  profession: z.enum(['student', 'working', 'house wife', 'business', 'other'], {
    errorMap: () => ({ message: 'Profession is required' })
  }),
  irdaLicense: z.enum(['yes', 'no'], {
    errorMap: () => ({ message: 'IRDAI license selection is required' })
  })
});

router.post('/', async (req, res, next) => {
  try {
    const result = advisorSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.flatten().fieldErrors
      });
    }

    const payload = {
      ...result.data,
      form: 'advisor-application'
    };

    const persisted = await persistDocument('advisor_applications', payload);

    // eslint-disable-next-line no-console
    console.log('Advisor application received', { ...payload, persisted: persisted.persisted });

    return res.status(201).json({
      message: 'Application received. We will contact you shortly.',
      data: payload,
      persisted: persisted.persisted,
      id: persisted.id
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
