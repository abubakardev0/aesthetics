import { s3Client } from '@/s3/s3Client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebase-config';

async function uploadImage(image) {
    const fileType = image.split(';')[0].split('/')[1];
    const base64Data = new Buffer.from(
        image.replace(/^data:image\/\w+;base64,/, ''),
        'base64'
    );
    const bucketParams = {
        Bucket: 'fypaesthetics',
        Key: `image-${Date.now()}.${fileType}`,
        Body: base64Data,
        ContentEncoding: 'base64',
        ContentType: `image/${fileType}`,
    };
    const obj = await s3Client.send(new PutObjectCommand(bucketParams));
    if (obj) {
        return `https://fypaesthetics.s3.ap-south-1.amazonaws.com/${bucketParams.Key}`;
    } else return null;
}

export default async function handler(req, res) {
    const data = req.body.data.images;
    const imagesPath = [];
    if (req.method === 'POST') {
        try {
            for (let i = 0; i < data.length; i++) {
                const image = await uploadImage(data[i]);
                if (image) {
                    imagesPath.push(image);
                }
            }
            const artwork = {
                images: imagesPath,
                certificates: [null],
                artist: 'Eastman Johnson',
                description: '',
                dimensions: {
                    height: 70,
                    width: 79,
                    depth: null,
                    unit: 'cm',
                },
                worth: {
                    price: 19000,
                },
                mediums: ['Acrylic'],
                category: 'Landscape',
                surfaces: ['Canvas'],
                title: 'Sunset in the sea',
                type: 'immediate',
                uploadedAt: Timestamp.fromDate(new Date()),
                seller: req.body.data.uid,
            };
            await addDoc(collection(db, 'artworks'), artwork);
            res.status(200).json({
                status: 'success',
            });
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
};
