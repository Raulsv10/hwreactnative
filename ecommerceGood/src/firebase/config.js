import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAbCr0uKn7XD5rSzwHffVOH2msSa-ryJ6Y",
  authDomain: "rnchrsv.firebaseapp.com",
  databaseURL: "https://rnchrsv-default-rtdb.firebaseio.com",
  projectId: "rnchrsv",
  storageBucket: "rnchrsv.firebasestorage.app",
  messagingSenderId: "924604153161",
  appId: "1:924604153161:web:25c849fe6ab97b9eceee98",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
