import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAbCr0uKn7XD5rSzwHffVOH2msSa-ryJ6Y",
  authDomain: "rnchrsv.firebaseapp.com",
  projectId: "rnchrsv",
  storageBucket: "rnchrsv.firebasestorage.app",
  messagingSenderId: "924604153161",
  appId: "1:924604153161:web:25c849fe6ab97b9eceee98",
};

const app = initializeApp(firebaseConfig);

export const autenticacion = getAuth(app);

export const db = getFirestore(app);
