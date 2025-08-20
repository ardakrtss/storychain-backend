import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCgVQTNPiRBCQt_GGd_VPHOyjtNC1yTnDI",
  authDomain: "storychain-website.firebaseapp.com",
  projectId: "storychain-website",
  storageBucket: "storychain-website.firebasestorage.app",
  messagingSenderId: "689075505297",
  appId: "1:689075505297:web:650bb0eb934828554e1730",
  measurementId: "G-NL33C4CK8Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
