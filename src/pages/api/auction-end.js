import {
    doc,
    updateDoc,
    getDocs,
    collection,
    query,
    limit,
    orderBy,
    Timestamp,
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

    try {
        await updateDoc(doc(db, 'artworks', `${id}`), {
            status: 'archived',
            winner: {
                ...user,
                linkExpiry: Timestamp.fromDate(
                    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                ),
            },
        });
    } catch (e) {
        console.log(e);
    }
    await sendgrid.send({
        to: user.email,
        from: {
            email: 'keyowe1568@migonom.com',
            name: 'Aesthetics',
        },
        subject: 'You won the auction',
        html: `
            <section style="background-color: #f8fafc; padding: 15px">
                <p style="font-size: 16px; text-align:center; color:#334155; width:60%; margin: 0 auto;">
                Hey ${user.name},
                    Congratulation! You won the auction with the highest bid. Please follow the link below to pay for your item. You will have 7 days to pay before the listing is re-listed.
                    
                    Payment Link: 
                    <u><b>https://fyp-aesthetics.vercel.app/auction-checkout?itemId=${id}&userId=${user.user}</u></b>
                    
                    If you have any questions, please email us at:
                    <u><b>queries@aesthetics.com</b></u>.

                    Thanks for shopping with us!

                    Aesthetics
                </p>
            </section>       
            `,
    });
    res.send('resolved');
}
