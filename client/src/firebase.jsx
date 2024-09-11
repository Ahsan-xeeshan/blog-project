import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-app-dd30c.firebaseapp.com",
  projectId: "mern-blog-app-dd30c",
  storageBucket: "mern-blog-app-dd30c.appspot.com",
  messagingSenderId: "409796749958",
  appId: "1:409796749958:web:38f6015484174e555b3f07",
};

export const app = initializeApp(firebaseConfig);
