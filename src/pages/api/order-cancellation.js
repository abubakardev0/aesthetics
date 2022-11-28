import { db } from '@/firebase/firebase-config';
import { doc, updateDoc } from 'firebase/firestore';

const sendgrid = require('@sendgrid/mail');

sendgrid.setApiKey(process.env.SENTGRID_SECRET_KEY);

export default async function handler(req, res) {
    const { id, email, name } = req.body;

    try {
        await updateDoc(doc(db, 'orders', id), {
            status: 'cancelled',
        });
        await sendgrid.send({
            to: email,
            from: {
                email: 'keyowe1568@migonom.com',
                name: 'Aesthetics',
            },
            subject: 'Order Cancellation',
            html: `
                <section style="background-color: #f8fafc; padding: 15px">
                <h4 style="font-size: 16px; text-align:center">Order id: ${id}</h4>
                <br />
                <p style="font-size: 16px; text-align:center; color:#334155; width:60%; margin: 0 auto;">
                Hi, ${name} 
                    We're sad to hear that you cancel your order. We have received your cancellation request and are processing it.
                    Your amount will be refunded within 7 days.
                    If you have any questions, please email us at:
                    <u><b>queries@aesthetics.com</b></u>.
                </p>

                Thanks for shopping with us!

                Aesthetics
            </section>               
            `,
        });
        res.status(200).json({ message: 'Order cancelled' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
