import AWS from 'aws-sdk';

export const getS3 = () => {
    AWS.config.update({
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_KEY
    });
    const S3 = new AWS.S3({ apiVersion: 'latest' });
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
    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: key,
        Expires: 3600 * 3,
    };
    return await S3.getSignedUrlPromise('getObject', params);
};

export const getDescription = async (S3: any, path: string) => {
    try {
        const descriptionFile = await S3.getObject({
            Bucket: process.env.AWS_BUCKET || '',
            Key: path
        }).promise();
        return descriptionFile.Body?.toString();
    } catch (e) {
        console.log(e);
        return '';
    }
};
