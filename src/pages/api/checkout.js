import { db } from '@/firebase/firebase-config';
import {
    doc,
    getDoc,
    collection,
    addDoc,
    Timestamp,
    arrayRemove,
    updateDoc,
} from 'firebase/firestore';

const sendgrid = require('@sendgrid/mail');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

sendgrid.setApiKey(process.env.SENTGRID_SECRET_KEY);

async function getDocument(id) {
    try {
        const snap = await getDoc(doc(db, 'artworks', id));
        if (snap.exists()) return snap.data();
    } catch (error) {
        console.log(error);
    }
}

async function unListItem(id) {
    try {
        updateDoc(doc(db, 'artworks', id), {
            status: 'sold',
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function removeFromBag(itemsId, userId) {
    try {
        updateDoc(doc(db, 'bag', userId), {
            artworks: arrayRemove(...itemsId),
        });
    } catch (error) {
        console.log(error.message);
    }
}

export default async function handler(req, res) {
    const { id, contact, email, items, shippingDetails, userId } = req.body;
    let subtotal = 0;
    const shipping = 0;
    const lineItems = [];
    const sellers = [];
    let itemsId = [];
    for (let key of Object.keys(items)) {
        const { title, price, sellerId, images, artist } = await getDocument(
            items[key]
        );
        sellers.push(sellerId);
        itemsId.push(items[key]);
        subtotal += parseInt(price);
        lineItems.push({
            title,
            artist,
            itemId: items[key],
            price: price,
            image: images[0],
            sellerId: sellerId,
        });
    }

    try {
        const intent = await stripe.paymentIntents.create({
            amount: subtotal * 100 + shipping,
            currency: 'pkr',
            payment_method: id,
            confirm: true,
            metadata: { integration_check: 'accept_a_payment' },
        });
        const order = {
            subtotal,
            shipping,
            totalAmount: subtotal + shipping,
            email,
            items: lineItems,
            shippingDetails: {
                ...shippingDetails,
                contact,
            },
            sellers,
            userId,
            paymentId: intent.id,
            status: 'completed',
            placedAt: Timestamp.fromDate(new Date()),
        };
        const docRef = await addDoc(collection(db, 'orders'), order);

        for (let item of itemsId) {
            unListItem(item);
        }
        removeFromBag(itemsId, userId);

        sendgrid.send({
            to: email,
            from: {
                email: 'keyowe1568@migonom.com',
                name: 'Aesthetics',
            },
            subject: 'Order Confirmation',
            html: `
                <section style="background-color: #f8fafc; padding: 15px">
                <h4 style="font-size: 16px; text-align:center">Order id: ${docRef.id}</h4>
                <br />
                <p style="font-size: 16px; text-align:left; color:#334155; width:80%; margin: 15px auto;">
                Hey ${shippingDetails.name},
                <br />
                    We are excited to tell you that your order has been confirmed. Thank you for shopping with us! We hope you enjoyed your experience and found what you were looking for. If not, please let us know, we're happy to help.
                    You will receive your purchase in 7 working days.
                    <br />
                    <br />
                    If you have any questions, please email us at <u><b>queries@aesthetics.com</b></u>.
                    <br />
                    We hope to see you in our store again soon!
                </p>

                Thanks for shopping with us!
                <br />
                Aesthetics
            </section>
            `,
        });

        res.status(200).json({
            url: `https://fyp-aesthetics.vercel.app/success?order_id=${docRef.id}`,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
