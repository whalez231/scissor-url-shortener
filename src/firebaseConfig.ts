// src/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAZdfJYjLHAWVNNOFSA04IzuO_MV2ihEc",
  authDomain: "sciss-ab05d.firebaseapp.com",
  projectId: "sciss-ab05d",
  storageBucket: "sciss-ab05d.appspot.com",
  messagingSenderId: "149603821906",
  appId: "1:149603821906:web:f1183b8fdeadb6914b328b",
  measurementId: "G-77SFX5JNWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
