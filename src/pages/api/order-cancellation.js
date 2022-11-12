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
            from: 'keyowe1568@migonom.com',
            subject: 'Order Cancellation',
            html: `<p style="font-size: 16px; text-align:center">Order id: ${id}</p>
                <br />
                Hi, ${name} 
                    We're sad to hear that you cancel your order. We have received your cancellation request and are processing it.
                    Your amount will be refunded within 7 days.
            `,
        });
        res.status(200).json({ message: 'Order cancelled' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
