import { db } from '@/firebase/firebase-config';
import { collection, query, orderBy, where } from 'firebase/firestore';

export function priceFilterQuery(min, max) {
    return query(
        collection(db, 'artworks'),
        where('status', '==', 'listed'),
        where('price', '>=', min),
        where('price', '<=', max),
        orderBy('price', 'asc')
    );
}
export function typeFilterQuery(type) {
    return query(
        collection(db, 'artworks'),
        where('status', '==', 'listed'),
        where('type', '==', type),
        orderBy('uploadedAt', 'desc')
    );
}
export function categoryFilterQuery(category) {
    return query(
        collection(db, 'artworks'),
        where('status', '==', 'listed'),
        where('category', '==', category),
        orderBy('uploadedAt', 'desc')
    );
}
export function artistFilterQuery(name) {
    return query(
        collection(db, 'artworks'),
        where('status', '==', 'listed'),
        where('artist', '==', name),
        orderBy('uploadedAt', 'desc')
    );
}
