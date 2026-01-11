import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOmBxsbs6iotKlpC9wZ5uibchoIEIjrHQ",
  authDomain: "ml-ntwx-app.firebaseapp.com",
  projectId: "ml-ntwx-app",
  storageBucket: "ml-ntwx-app.firebasestorage.app",
  messagingSenderId: "358935718566",
  appId: "1:358935718566:web:16d8808189b48f2d3ce267",
  measurementId: "G-MVQCRKQPTS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);