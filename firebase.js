// backend/firebaseAdmin.js
const admin = require("firebase-admin")
// const serviceAccount = require("./screenscore-7e189-firebase-adminsdk-fbsvc-1085b521a9.json")
// import admin from "firebase-admin";
// import serviceAccount from "./screenscore-7e189-firebase-adminsdk-fbsvc-1085b521a9.json"; // 🔐 Do NOT expose this in frontend

if (!admin.apps.length) {
  admin.initializeApp({
    // credential: admin.credential.cert(serviceAccount),
    credential: admin.credential.cert({
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      universe_domain : process.env.FIREBASE_UNIVERSE_DOMAIN
    }),
  });
}

const auth = admin.auth();

// export { admin, auth };
module.exports = {admin, auth};