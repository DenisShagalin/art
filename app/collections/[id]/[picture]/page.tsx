import { getDescription, getS3, getSignedUrl } from '@/app/utils/s3';
import { headers } from 'next/headers';
import './index.css';
import Carousel from '@/app/common/Carousel';

const getCurrentPath = () => {
  const headersList = headers();
  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";
  const protocol = headersList.get("x-forwarded-proto") || "";
  return fullUrl.replace(`${protocol}://${domain}/`, '');
};

export default async function Picture({ params }: { params: { picture: string, id: string } }) {
  const path = getCurrentPath();
  const S3 = getS3();

  const entity = path.split('/')[0];
  if (!entity) {
    return null;
  }

  const description = await getDescription(S3, `${entity}/${params.id}/${params.picture}/description.txt`);

  if (!description) {
    return null;
  }
  const textValues = description?.split('||') || [];

  const allFiles = await S3.listObjects({
    Bucket: process.env.AWS_BUCKET || '',
    Prefix: `${entity}/${params.id}/${params.picture}`,
  }).promise();

  const collectionImages: string[] = [];

  for (let idx in allFiles.Contents) {
    // @ts-ignore
    const item = allFiles.Contents[idx];
    if (item?.Key?.endsWith('.jpg') && !item?.Key.endsWith('title.jpg')) {
      const url = await getSignedUrl(S3, item.Key);
      collectionImages.push(url);
    }
  }

  return (
    <div className='picture_wrap'>
      <h3>{textValues[0]}</h3>
      <div>
        <Carousel loading={false}>
          {collectionImages.map(url =>
            <div key={url}>
              <img src={url} style={{ width: '99%' }} />
            </div>
          )}
        </Carousel>
      </div>
      <p>{textValues[1]}</p>
      <p>{textValues[2]}</p>
    </div>
  );
}
