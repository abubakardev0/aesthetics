import { db } from '@/firebase/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENTGRID_SECRET_KEY);

export default async function handler(req, res) {
    const { id, paymentId, email, name } = req.body;
    try {
        await stripe.refunds.create({
            payment_intent: paymentId,
        });
        await updateDoc(doc(db, 'orders', id), {
            paymentId: null,
        });
        await sendgrid.send({
            to: email,
            from: 'keyowe1568@migonom.com',
            subject: 'Order amount Refunded',
            html: `<p style="font-size: 16px; text-align:center">Order id: ${id}</p>
                <br />
                Hi, ${name},
                    Your order amount has been refunded.
            `,
        });
        res.status(200).json({ message: 'Refunded' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
