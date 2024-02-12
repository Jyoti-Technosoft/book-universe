
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA9N8OqoEEPaKTq1N5-ReMqoIOH-dJfCgk",
  authDomain: "books-universe-jt.firebaseapp.com",
  projectId: "books-universe-jt",
  storageBucket: "books-universe-jt.appspot.com",
  messagingSenderId: "225327447873",
  appId: "1:225327447873:web:c1984c59d926a59b32abc0",
  measurementId: "G-FWH4DTR2SK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(app);

export { storage };
