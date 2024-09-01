import { getDescription, getS3, getSignedUrl } from '@/app/utils/s3';
import { Flex } from 'antd';
import Link from 'next/link';
import './index.css';

export default async function Collections({ params }: { params: { id: string } }) {
  const S3 = getS3();

  const collection = await S3.listObjects({
    Bucket: process.env.AWS_BUCKET || '',
    Prefix: `exhibitions/${params.id}`
  }).promise();

  const collectionImages = [];

  for (let idx in collection.Contents) {
    // @ts-ignore
    const item = collection.Contents[idx];
    if (item.Key?.endsWith('title.jpg')) {
      const url = await getSignedUrl(S3, item.Key);
      const name = item.Key.split('/')[2]
      collectionImages.push({ url, name });
    }
  }

  const description = await getDescription(S3, `exhibitions/${params.id}/description.txt`);
  const textValues = description?.split('||') || [];

  return (
    <div className='images_wrapper'>
      {textValues[0] && <h3>{textValues[0]}</h3>}
      {textValues[1] && <p>{textValues[1]}</p>}
      <Flex gap='middle' wrap>
        {collectionImages.map((image) => (
          <div key={image.name} className='image_wrap'>
            <Link href={`/exhibitions/${params.id}/${image.name}`}>
              <img src={image.url} style={{ width: '100%' }} />
              <p className='img_description'>{image.name}</p>
            </Link>
          </div>
        ))}
      </Flex>
    </div>
  )
}
