import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDl0DInsMmwoqJ0GFVMBHDNEyJbvdE-eqM",
  authDomain: "eba-chegou.firebaseapp.com",
  projectId: "eba-chegou",
  storageBucket: "eba-chegou.appspot.com",
  messagingSenderId: "1030908390517",
  appId: "1:1030908390517:web:90ee0d311ac5fe9ec0dc3c",
  measurementId: "G-BCR9HZ8Q6Q"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
