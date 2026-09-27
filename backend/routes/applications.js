const express = require('express');
const router = express.Router();
const { db, admin } = require('../firebase/firebaseAdmin');

const REQUIRED_FIELDS = [
  'internshipId',
  'fullName',
  'email',
  'phone',
  'college',
  'course',
  'graduationYear',
  'coverLetter',
  'resumeDriveLink',
];

// POST /api/applications -> submit a new application
router.post('/', async (req, res) => {
  try {
    const body = req.body || {};

    const missing = REQUIRED_FIELDS.filter((field) => !body[field] || String(body[field]).trim() === '');
    if (missing.length > 0) {
      return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
    }
    if (!/\S+@\S+\.\S+/.test(body.email)) {
      return res.status(400).json({ error: 'Email is invalid' });
    }
    if (!body.resumeDriveLink.includes('drive.google.com')) {
      return res.status(400).json({ error: 'Please provide a valid Google Drive link' });
    }
    if (!body.agreeToTerms) {
      return res.status(400).json({ error: 'You must agree to the terms' });
    }

    // Look up the internship so we snapshot its details onto the application
    const internshipDoc = await db.collection('internships').doc(body.internshipId).get();
    const internship = internshipDoc.exists ? internshipDoc.data() : {};

    const applicationData = {
      internshipId: body.internshipId,
      internshipTitle: internship.internshipTitle || body.internshipTitle || '',
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      college: body.college,
      course: body.course,
      graduationYear: body.graduationYear,
      coverLetter: body.coverLetter,
      resumeDriveLink: body.resumeDriveLink,
      agreeToTerms: !!body.agreeToTerms,
      studentId: body.studentId || 'unknown',
      submittedAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
      internshipStatus: 'not started',
      startDate: internship.startDate || '',
      endDate: internship.endDate || '',
      duration: internship.duration || '',
      mentor: 'Not assigned',
    };

    const docRef = await db.collection('applications').add(applicationData);
    res.status(201).json({ id: docRef.id, message: 'Application submitted successfully' });
  } catch (err) {
    console.error('Error submitting application:', err);
    res.status(500).json({ error: 'Failed to submit application. Please try again.' });
  }
});

module.exports = router;
