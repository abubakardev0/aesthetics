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

const nodemailer = require('nodemailer');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

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
        await updateDoc(doc(db, 'artworks', id), {
            status: 'sold',
        });
    } catch (error) {
        console.log(error.message);
    }
}

async function removeFromBag(itemsId, userId) {
    try {
        await updateDoc(doc(db, 'bag', userId), {
            artworks: arrayRemove(...itemsId),
        });
    } catch (error) {
        console.log(error.message);
    }
}

export default async function handler(req, res) {
    const { id, contact, email, items, shippingDetails, userId } = req.body;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'noreplyaesthetics@gmail.com',
            pass: 'eepb fwhz ofnh jbdl',
        },
    });
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
            status: 'processing',
            placedAt: Timestamp.fromDate(new Date()),
        };
        const docRef = await addDoc(collection(db, 'orders'), order);

        for (let item of itemsId) {
            await unListItem(item);
        }
        await removeFromBag(itemsId, userId);

        const mailOptions = {
            from: 'Aesthetics <noreplyaesthetics@gmail.com>',
            to: email,
            subject: 'Order Confirmation',
            html: `<p style="font-size: 16px; text-align:center">Order id: ${docRef.id}</p>
                <br />
                Hey, ${shippingDetails.name} Your order has been placed.
            `,
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) console.log(err);
            else console.log(info);
        });

        res.status(200).json({
            url: `https://fyp-aesthetics.vercel.app/success?order_id=${docRef.id}`,
        });
    } catch (error) {
        res.status(400).json(error.message);
    }
}
