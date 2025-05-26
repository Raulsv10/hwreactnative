// import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyAbCr0uKn7XD5rSzwHffVOH2msSa-ryJ6Y",
//   authDomain: "rnchrsv.firebaseapp.com",
//   projectId: "rnchrsv",
//   storageBucket: "rnchrsv.firebasestorage.app",
//   messagingSenderId: "924604153161",
//   appId: "1:924604153161:web:25c849fe6ab97b9eceee98",
// };

// const app = initializeApp(firebaseConfig);

// const autenticacion = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// const db = getDatabase(app);

// export { autenticacion, db };

// src/firebase/fiirebaseConf.js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAbCr0uKn7XD5rSzwHffVOH2msSa-ryJ6Y",
  authDomain: "rnchrsv.firebaseapp.com",
  projectId: "rnchrsv",
  storageBucket: "rnchrsv.firebasestorage.app",
  messagingSenderId: "924604153161",
  appId: "1:924604153161:web:25c849fe6ab97b9eceee98",
};

const app = initializeApp(firebaseConfig);

const autenticacion = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getDatabase(app);

export { autenticacion, db };
