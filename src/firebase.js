import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClrW_mM-SDeGCZ1psjwQeYE7FEdIMxQ1A",
  authDomain: "backsozi.firebaseapp.com",
  projectId: "backsozi",
  storageBucket: "backsozi.appspot.com",
  messagingSenderId: "589766431994",
  appId: "1:589766431994:web:9d48291b457676fe452543",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
