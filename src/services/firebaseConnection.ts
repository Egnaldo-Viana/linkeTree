
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfi-wAwDc4_ULF5IxQCA_aPmWZ5dqAI5c",
  authDomain: "reactlinks-e3963.firebaseapp.com",
  projectId: "reactlinks-e3963",
  storageBucket: "reactlinks-e3963.firebasestorage.app",
  messagingSenderId: "782960436794",
  appId: "1:782960436794:web:0615737fa2065de18b3703"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export {auth, db}