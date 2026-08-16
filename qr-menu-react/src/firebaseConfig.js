import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';

// Firebase platformunda oluşturduğumuz projeye bağlanabilmemiz için gerekli benzersiz kimlik bilgileri
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Yapılandırma ayarlarını kullanarak arka planda Firebase uygulamasını başlatır
const app = initializeApp(firebaseConfig);

// Uygulama genelinde veritabanı işlemlerini (CRUD) yapabilmek için Firestore referansını dışa aktarıyoruz
export const db = getFirestore(app);

// Uygulama genelinde kullanıcı giriş/çıkış ve oturum yönetimini sağlamak için Auth referansını dışa aktarıyoruz
export const auth = getAuth(app);
