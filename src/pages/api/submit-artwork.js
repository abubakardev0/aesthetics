import { s3Client } from '@/s3/s3Client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase/firebase-config';

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

async function uploadDocument(doc) {
    const fileType = doc.split(';')[0].split('/')[1];
    const base64Data = new Buffer.from(
        doc.replace(/^data:application\/\w+;base64,/, ''),
        'base64'
    );
    const bucketParams = {
        Bucket: 'fypaesthetics',
        Key: `document-${Date.now()}.${fileType}`,
        Body: base64Data,
        ContentEncoding: 'base64',
        ContentType: `doc/${fileType}`,
    };
    const obj = await s3Client.send(new PutObjectCommand(bucketParams));
    if (obj) {
        return `https://fypaesthetics.s3.ap-south-1.amazonaws.com/${bucketParams.Key}`;
    } else return null;
}

export default async function handler(req, res) {
    const data = req.body.data;
    const imagesPath = [];
    const certificatesPath = [];
    if (req.method === 'POST') {
        try {
            for (let i = 0; i < data.images.length; i++) {
                const image = await uploadImage(data.images[i]);
                if (image) {
                    imagesPath.push(image);
                }
            }
            for (let i = 0; i < data.certificates.length; i++) {
                const certificate = await uploadDocument(data.certificates[i]);
                if (certificate) {
                    certificatesPath.push(certificate);
                }
            }
            const artwork = {
                images: imagesPath,
                certificates:
                    certificatesPath.length === 0 ? null : certificatesPath,
                uid: data.uid,
                artist: data.artist.toLocaleLowerCase(),
                title: data.title.toLocaleLowerCase(),
                rarity: data.rarity.toLocaleLowerCase(),
                height: parseInt(data.height),
                width: parseInt(data.width),
                depth: data.depth ? parseInt(depth) : null,
                unit: data.unit.toLocaleLowerCase(),
                mediums: data.mediums,
                surfaces: data.surfaces,
                status: 'pending',
                submittedAt: Timestamp.fromDate(new Date()),
            };
            await addDoc(collection(db, 'submittedArtworks'), artwork);
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
