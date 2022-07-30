import { S3Client } from '@aws-sdk/client-s3';

const REGION = 'ap-south-1';

const CREDENTIAL = {
    accessKeyId: process.env.NEXT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_APP_AWS_SECRET_ACCESS_KEY,
};
const s3Client = new S3Client({
    region: REGION,
    credentials: CREDENTIAL,
});
export { s3Client };
