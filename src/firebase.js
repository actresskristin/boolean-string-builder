// Replace with your Firebase project credentials.
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
 apiKey: "AIzaSyBGPA8Du4LYrSc7HGiLbkxhKQwtKB6G9PI",
  authDomain: "hour-search-boolean-builder.firebaseapp.com",
  projectId: "hour-search-boolean-builder",
  storageBucket: "hour-search-boolean-builder.firebasestorage.app",
  messagingSenderId: "15633842289",
  appId: "1:15633842289:web:5b45d6c11bb2e195799bd0",
  measurementId: "G-C4YEBFSXEG"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)