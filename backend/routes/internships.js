const express = require('express');
const router = express.Router();
const { db } = require('../firebase/firebaseAdmin');

// GET /api/internships  -> all active internships
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('internships').where('isActive', '==', true).get();
    const internships = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(internships);
  } catch (err) {
    console.error('Error fetching internships:', err);
    res.status(500).json({ error: 'Failed to load internships. Please try again later.' });
  }
});

// GET /api/internships/:id -> single internship
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('internships').doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Internship not found' });
    }
    res.json({ id: doc.id, ...doc.data() });
  } catch (err) {
    console.error('Error fetching internship:', err);
    res.status(500).json({ error: 'Failed to load internship.' });
  }
});

module.exports = router;
