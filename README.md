# Internship Portal (React + Node.js/Express + Firebase)

A full-stack internship listing & application project.

- **frontend/** — React (Vite) app. Shows active internships, lets a signed-in
  student apply. Talks to the backend over HTTP (no direct Firestore calls
  from the browser anymore).
- **backend/** — Node.js/Express API. Uses `firebase-admin` on the server to
  read/write Firestore (`internships`, `applications` collections).

```
internship-project/
├── backend/
│   ├── firebase/firebaseAdmin.js
│   ├── routes/internships.js
│   ├── routes/applications.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── api/axios.js
    │   ├── layouts/ (SuspenseLayout, MainLayout)
    │   ├── pages/ (InternshipListings, Login, RefreshContext)
    │   ├── routes/auth.routes.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── .env.example
```

## 1. Firebase setup

1. Create (or reuse) a Firebase project with **Firestore** enabled.
2. Create two collections: `internships` and `applications` (the API creates
   `applications` docs for you; just make sure `internships` has some
   documents with `isActive: true`).
3. Go to **Project Settings → Service Accounts → Generate new private key**.
   Save the downloaded JSON as `backend/serviceAccountKey.json`
   (this file is git-ignored).

## 2. Backend setup

```bash
cd backend
npm install
cp .env.example .env
# edit .env: set GOOGLE_APPLICATION_CREDENTIALS=./serviceAccountKey.json
npm run dev        # starts on http://localhost:5000
```

Endpoints:
- `GET  /api/internships` — list active internships
- `GET  /api/internships/:id` — one internship
- `POST /api/applications` — submit an application

## 3. Frontend setup

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api (default already matches backend)
npm run dev         # starts on http://localhost:5173
```

Open http://localhost:5173 — you should see the internship list pulled
from your backend/Firestore.

## 4. Auth note

`Login.jsx` is a **placeholder** sign-in: it just saves a name/email to
`localStorage` so the rest of the app (which checks `localStorage.getItem
('user')`) works end to end. Swap it for real authentication (Firebase Auth,
your own JWT login, etc.) before going to production — the rest of the app
does not need to change since it only reads `{ uid, username, email }` from
`localStorage`.

## 5. Build for production

```bash
cd frontend && npm run build     # outputs frontend/dist
cd backend  && npm start         # or deploy with pm2 / a host of your choice
```
