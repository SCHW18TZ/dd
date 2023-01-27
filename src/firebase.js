import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyB5bYBqPni9Y7VRnnnjE-qk217q8_Vnkt8",
  authDomain: "chuchi-afa4b.firebaseapp.com",
  projectId: "chuchi-afa4b",
  storageBucket: "chuchi-afa4b.appspot.com",
  messagingSenderId: "458677175659",
  appId: "1:458677175659:web:30f362f533589dca35782e",
  measurementId: "G-6Q6PPEBN0S",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
