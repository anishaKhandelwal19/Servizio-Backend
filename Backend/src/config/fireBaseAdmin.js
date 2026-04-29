import admin from "firebase-admin";
import serviceAccount from "../../secrets/firebase-serviceAccountKey.js";
const initializeFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
};

export default initializeFirebase;
