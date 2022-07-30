import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyByRsQZ2-duG0pNLAIMxr_3pnBVTjLW7hU',
    authDomain: 'aesthetics-dev-a0a6f.firebaseapp.com',
    projectId: 'aesthetics-dev-a0a6f',
    storageBucket: 'aesthetics-dev-a0a6f.appspot.com',
    messagingSenderId: '810437654968',
    appId: '1:810437654968:web:aa00c78af49717f0d3774d',
    measurementId: 'G-VZEC2SLMK7',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db, auth };
