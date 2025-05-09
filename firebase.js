// backend/firebaseAdmin.js
import admin from "firebase-admin";
import serviceAccount from "./screenscore-7e189-firebase-adminsdk-fbsvc-1085b521a9.json"; // 🔐 Do NOT expose this in frontend

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();

export { admin, auth };
