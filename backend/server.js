require('dotenv').config();
const express = require('express');
const cors = require('cors');

const internshipsRouter = require('./routes/internships');
const applicationsRouter = require('./routes/applications');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Internship API is running' });
});

app.use('/api/internships', internshipsRouter);
app.use('/api/applications', applicationsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Central error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`🚀 Internship API listening on http://localhost:${PORT}`);
});
