const admin = require('firebase-admin');

if (!admin.apps.length) {
  try {
    if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
      // Option B: individual env vars (private key stores \n as literal characters)
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    } else {
      // Option A: GOOGLE_APPLICATION_CREDENTIALS points to a service account JSON file
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
      });
    }
    console.log('✅ Firebase Admin initialized');
  } catch (err) {
    console.error('❌ Failed to initialize Firebase Admin. Check your .env credentials.', err.message);
  }
}

const db = admin.firestore();

module.exports = { admin, db };
