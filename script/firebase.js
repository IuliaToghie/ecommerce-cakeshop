// Import the functions you need from the SDKs you need
import { initializeApp } from "../node_modules/firebase/app";
import { getAnalytics } from "../node_modules/firebase/analytics";
import { doc, getDoc, getFirestore, setDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot} from "../node_modules/firebase/firestore";

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDwK3cRrrcz3_PTUdB_yGUKGI_Osbz_zYc",
    authDomain: "web-application-for-cake-shop.firebaseapp.com",
    projectId: "web-application-for-cake-shop",
    storageBucket: "web-application-for-cake-shop.appspot.com",
    messagingSenderId: "195546127026",
    appId: "1:195546127026:web:38fa45d78946ed9e5f47ab",
    measurementId: "G-11CHH76SMX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const initialProductsRef = doc(db, "products", "8qJH3VAkBnCUIBqvZYq0");
const cartDataRef = doc(db, "products", "cart");

const initialProducts = getDoc(initialProductsRef);
const cartData = getDoc(cartDataRef);

export {initialProducts, cartData, setDoc, updateDoc, cartDataRef, arrayUnion, arrayRemove, doc, db, onSnapshot};