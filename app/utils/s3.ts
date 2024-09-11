import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl as awsSignedURL } from "@aws-sdk/s3-request-presigner";

export const getS3 = () => {
    const S3 = new S3Client({
        region: process.env.AWS_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
        },
    });

    return S3;
};


export const getImagesKeys = (data: Array<any> = []) => {
    return data.reduce((acc, value) => {
        if (value.Key.endsWith('.jpg')) {
            acc.push(value.Key);
        }
        return acc;
    }, []);
};

export const getSignedUrl = async (S3: any, key: string) => {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: key
    });
    return await awsSignedURL(S3, command, { expiresIn: 3600 * 3 });
};

export const getDescription = async (S3: any, path: string) => {
    try {
        const descriptionFile = await S3.send(new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET || '',
            Key: path
        }))
        return await descriptionFile.Body.transformToString();
    } catch (e) {
        console.warn(`Warn: Description ${path} does not exist`);
        return '';
    }
};
