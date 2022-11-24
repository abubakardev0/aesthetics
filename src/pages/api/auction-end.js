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
    let user = null;
    const ref = await getDocs(
        query(
            collection(db, 'artworks', `${id}`, 'bids'),
            orderBy('value', 'desc'),
            limit(1)
        )
    );
    ref.forEach((document) => {
        user = document.data();
    });

    await updateDoc(doc(db, 'artworks', `${id}`), {
        status: 'archived',
        winner: user,
    });
    await sendgrid.send({
        to: user.email,
        from: {
            email: 'keyowe1568@migonom.com',
            name: 'Aesthetics',
        },
        subject: 'You won the auction',
        html: `Hey ${user.name},
                    Congratulation! You won the auction with the highest bid. 
                    Please follow the link below to pay for your item. 
                    link=http://localhost:3000/auction-checkout?itemId=${id}&userId=${user.user}
                    You will have 7 days to pay before the listing is re-listed. 
                    Included below are some helpful links to help you make informed 
                    
            `,
    });
    res.send('resolved');
}
