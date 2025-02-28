import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAxIUIma5j-FGh4LTELTTgFheAXJKXSDME",
    authDomain: "fx-demo-977c9.firebaseapp.com",
    projectId: "fx-demo-977c9",
    storageBucket: "fx-demo-977c9.firebasestorage.app",
    messagingSenderId: "291427181224",
    appId: "1:291427181224:web:f7c3ae8be7a2c91409d89d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
