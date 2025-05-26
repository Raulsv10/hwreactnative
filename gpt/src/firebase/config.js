import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Tu configuración
const firebaseConfig = {
  apiKey: "AIzaSyAbCr0uKn7XD5rSzwHffVOH2msSa-ryJ6Y",
  authDomain: "rnchrsv.firebaseapp.com",
  databaseURL: "https://rnchrsv-default-rtdb.firebaseio.com",
  projectId: "rnchrsv",
  storageBucket: "rnchrsv.firebasestorage.app",
  messagingSenderId: "924604153161",
  appId: "1:924604153161:web:25c849fe6ab97b9eceee98",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db, signInAnonymously };
