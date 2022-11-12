import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBlM-D0IYQjVUC2dgEuGdTQ5sgT_C4Vy80',
    authDomain: 'fyp-aesthetics.firebaseapp.com',
    projectId: 'fyp-aesthetics',
    storageBucket: 'fyp-aesthetics.appspot.com',
    messagingSenderId: '609168028009',
    appId: '1:609168028009:web:c03baf1da964ea4ff0cdf8',
    measurementId: 'G-N8ZZYDR5D4',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };
