import { initializeApp, getApps, getApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth } from 'firebase/auth';
import * as authModule from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDID7Rm0L6Uk0tJLeQODMJe4ZWUj_wnJgE',
  authDomain: 'devcurso-9e432.firebaseapp.com',
  projectId: 'devcurso-9e432',
  storageBucket: 'devcurso-9e432.firebasestorage.app',
  messagingSenderId: '47809952611',
  appId: '1:47809952611:web:dcbe28a62ad1fb3c7a7156',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth: any;

try {
  auth = initializeAuth(app, {
    persistence: (authModule as any).getReactNativePersistence(AsyncStorage),
  });
} catch {
  auth = getAuth(app);
}

const db = getFirestore(app);

export { app, db, auth };
