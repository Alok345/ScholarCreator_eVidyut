import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig"; 
import { getFirestore } from "firebase/firestore/lite";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);


export { auth,  db ,app };
