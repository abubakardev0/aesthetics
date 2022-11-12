import {
    doc,
    updateDoc,
    getDocs,
    getDoc,
    collection,
    query,
    limit,
    orderBy,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey(process.env.SENTGRID_SECRET_KEY);

export default async function handler(req, res) {
    const id = req.body.documentId;
    let userId = null;
    let user = null;
    const ref = await getDocs(
        query(
            collection(db, 'artworks', `${id}`, 'bids'),
            orderBy('value', 'desc'),
            limit(1)
        )
    );
    ref.forEach((document) => {
        userId = document.data().user;
    });
    const userRef = await getDoc(doc(db, 'users', `${userId}`));
    if (userRef.exists) {
        user = userRef.data();
    }
    await sendgrid.send({
        to: user.email,
        from: 'keyowe1568@migonom.com',
        subject: 'You won the auction',
        html: `Hey ${user.name},
                    Congratulation! You won the auction with the highest bid. 
                    Please follow the link below to pay for your item. 
                    You will have 7 days to pay before the listing is re-listed. 
                    Included below are some helpful links to help you make informed 
                    
            `,
    });
    await updateDoc(doc(db, 'artworks', `${id}`), {
        status: 'sold',
    });
    res.send('resolved');
}
