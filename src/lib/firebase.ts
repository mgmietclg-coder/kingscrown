// ============================================================================
// Firebase Firestore Configuration & Initialization
// ============================================================================
// This file initializes Firebase and exports the Firestore database instance (db)
// used throughout the app for saving table bookings and reading them in Admin Dashboard.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Kings Crown Firebase project configuration credentials
export const firebaseConfig = {
  apiKey: "AIzaSyB1521tL9zRj37hTqV4qmOTC029yfsiWBQ",
  authDomain: "kings-crown-5a7d6.firebaseapp.com",
  projectId: "kings-crown-5a7d6",
  storageBucket: "kings-crown-5a7d6.firebasestorage.app",
  messagingSenderId: "692020933933",
  appId: "1:692020933933:web:e39db871702043479f0fa4"
};

// Initialize Firebase App (preventing duplicate initialization on reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export the default Firestore database instance
export const db = getFirestore(app);

// Export Firebase Auth instance (available if authentication is added later)
export const auth = getAuth(app);

