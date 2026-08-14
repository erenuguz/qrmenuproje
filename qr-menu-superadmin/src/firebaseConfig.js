import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBn4EWc3H39SXJ32EFm_rCEkT8zaRZ8kp4",
    authDomain: "qr-menu-database.firebaseapp.com",
    projectId: "qr-menu-database",
    storageBucket: "qr-menu-database.firebasestorage.app",
    messagingSenderId: "380504592953",
    appId: "1:380504592953:web:5ba68561ad230f34f833e8",
    measurementId: "G-4FCTP1XPMQ"
};

// Ana Motor (Eğer yoksa kur, varsa olanı kullan - Çökmeyi engeller)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

// İkincil Motor (SecondaryApp)
let secondaryApp;
if (!getApps().some(a => a.name === "SecondaryApp")) {
    secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
} else {
    secondaryApp = getApp("SecondaryApp");
}
export const secondaryAuth = getAuth(secondaryApp);