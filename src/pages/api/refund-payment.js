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
            from: {
                email: 'keyowe1568@migonom.com',
                name: 'Aesthetics',
            },
            subject: 'Order amount Refunded',
            html: `
            <section style="background-color: #f8fafc; padding: 15px">
                <h4 style="font-size: 16px; text-align:center">Order id: ${id}</h4>
                <br />
                <p>
                    Hi, ${name},
                    We're sorry to inform you that your order has been refunded. We hope this email finds you well. If you have any questions, please contact our customer service team at <u><b>queries@aesthetics.com</b></u>.
                </p>

                
                Thank you!

                Aesthetics
            </section>
            `,
        });
        res.status(200).json({ message: 'Refunded' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
