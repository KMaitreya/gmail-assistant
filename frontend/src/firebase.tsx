import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Ensure you have this in your .env file
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN, // Ensure you have this in your .env file
  projectId: import.meta.env.RVITE_FIREBASE_PROJECT_ID, // Ensure you have this in your .env file
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET, // Ensure you have this in your .env file
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID, // Replace with your actual messaging sender ID
  appId: import.meta.env.VITE_FIREBASE_APP_ID, // Ensure you have this in your .env file
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID // Optional, but useful for analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function for Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;  // Returns user data
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

// Function to Sign Out
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

export const onAuthChange = (callback: { (user: any): void; (arg0: User | null): void; }) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export { auth };
