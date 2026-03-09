import { initializeApp } from "firebase/app";
   import { getAuth } from "firebase/auth";
   import { getFirestore } from "firebase/firestore";
   import { getStorage } from "firebase/storage";
   import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDE9cxpilPDTeECIeZY8DHRKiAb-0_sVdg",
  authDomain: "skinderma-clinic.firebaseapp.com",
  projectId: "skinderma-clinic",
  storageBucket: "skinderma-clinic.firebasestorage.app",
  messagingSenderId: "514528371193",
  appId: "1:514528371193:web:915f0f6b26daea0b1d9d28",
  measurementId: "G-MX28GEMZE5"
};

   const app = initializeApp(firebaseConfig);
   const analytics = getAnalytics(app);
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   export const storage = getStorage(app);