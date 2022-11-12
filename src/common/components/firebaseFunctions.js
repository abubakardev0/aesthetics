import {
    doc,
    getDoc,
    updateDoc,
    arrayRemove,
    arrayUnion,
} from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

export async function handler(document, set, type, id) {
    if (type) {
        await updateDoc(doc(db, document, auth.currentUser.uid), {
            artworks: arrayRemove(id),
        });
        set(false);
    } else {
        await updateDoc(doc(db, document, auth.currentUser.uid), {
            artworks: arrayUnion(id),
        });
        set(true);
    }
}

export async function inCollection(document, set, id) {
    const docRef = doc(db, document, auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const artworks = docSnap.data().artworks;
        const index = artworks.indexOf(id);
        if (index !== -1) {
            set(true);
            return;
        }
    }
}
