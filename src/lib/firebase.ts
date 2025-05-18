
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLpitx6SFzDm9w1EgSD52Taqte7fBbU3c",
  authDomain: "curios-search-buddy.firebaseapp.com",
  projectId: "curios-search-buddy",
  storageBucket: "curios-search-buddy.appspot.com",
  messagingSenderId: "448810418429",
  appId: "1:448810418429:web:your-app-id-here" // Replace with your actual appId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);
export default app;
