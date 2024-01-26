import {initializeApp} from '@react-native-firebase/app';
import {getAuth} from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAXCFPy_-WnjNofrvRkLMOwP8P6uPJ5TSc',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

