import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyB_gn3nZ5mwP3UReMoYe2fH8euHgcr5fPk",
  authDomain: "odor-easybuy.firebaseapp.com",
  projectId: "odor-easybuy",
  storageBucket: "odor-easybuy.appspot.com",
  messagingSenderId: "612274443206",
  appId: "1:612274443206:web:bbbfbd473d7986070318c7",
  measurementId: "G-KRC4TF78L8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app