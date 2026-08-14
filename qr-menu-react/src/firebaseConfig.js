import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase platformunda oluşturduğumuz projeye bağlanabilmemiz için gerekli benzersiz kimlik bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyBn4EWc3H39SXJ32EFm_rCEkT8zaRZ8kp4",
  authDomain: "qr-menu-database.firebaseapp.com",
  projectId: "qr-menu-database",
  storageBucket: "qr-menu-database.firebasestorage.app",
  messagingSenderId: "380504592953",
  appId: "1:380504592953:web:5ba68561ad230f34f833e8",
  measurementId: "G-4FCTP1XPMQ"
};

// Yapılandırma ayarlarını kullanarak arka planda Firebase uygulamasını başlatır
const app = initializeApp(firebaseConfig);

// Uygulama genelinde veritabanı işlemlerini (CRUD) yapabilmek için Firestore referansını dışa aktarıyoruz
export const db = getFirestore(app);

// Uygulama genelinde kullanıcı giriş/çıkış ve oturum yönetimini sağlamak için Auth referansını dışa aktarıyoruz
export const auth = getAuth(app);