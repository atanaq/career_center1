import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyAccCsM7Lusm8Tezl9y9HDAfHogy9RLTa4',
  authDomain: 'diplomidi.firebaseapp.com',
  databaseURL: 'https://diplomidi-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'diplomidi',
  storageBucket: 'diplomidi.firebasestorage.app',
  messagingSenderId: '628401338752',
  appId: '1:628401338752:web:847579a43a0b15d6a3a965',
  measurementId: 'G-S8LNDR7RSZ',
};

export const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      getAnalytics(firebaseApp);
    }
  });
}
