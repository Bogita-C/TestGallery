import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAkm-GvMt7r3c7OGHQOo6TvpSBnCYewcBA",
  authDomain: "galleryapp-536c0.firebaseapp.com",
  projectId: "galleryapp-536c0",
  storageBucket: "galleryapp-536c0.firebasestorage.app",
  messagingSenderId: "367122450537",
  appId: "1:367122450537:web:a485edddea5a424d58baf8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
