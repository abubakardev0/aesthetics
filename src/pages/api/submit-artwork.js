import { s3Client } from '../../common/utils/s3/s3Client';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../common/utils/firebase/firebase-config';

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
    const imagesPath = [];
    const certificatesPath = [];
    if (req.method === 'POST') {
        new Promise.all(
            req.body.data.images.map(async (image) => {
                const imagePath = await uploadImage(image);
                if (imagePath) {
                    imagesPath.push(imagePath);
                }
            })
        ).then(() => {
            new Promise.all(
                req.body.data.certificates.map(async (certificate) => {
                    const certificatePath = await uploadDocument(certificate);
                    if (certificatePath) {
                        certificatesPath.push(certificatePath);
                    }
                })
            ).then(() => {
                const artwork = {
                    images: imagesPath,
                    certificates: certificatesPath,
                    userId: req.body.data.userId,
                    artist: req.body.data.artist,
                    title: req.body.data.title,
                    rarity: req.body.data.rarity,
                    height: req.body.data.height,
                    width: req.body.data.width,
                    depth: req.body.data.depth,
                    unit: req.body.data.unit,
                    mediums: req.body.data.mediums,
                    surfaces: req.body.data.surfaces,
                    submittedAt: Timestamp.now(),
                };
                addDoc(collection(db, 'submittedArtworks'), artwork);
                res.status(200).json({
                    status: 'success',
                });
            });
        });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '20mb',
        },
    },
};
