import { getDescription, getS3, getSignedUrl } from '@/app/utils/s3';
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import './index.css';
import Carousel from '@/app/common/Carousel';
import { redirect } from 'next/navigation';

export default async function Picture({ params }: { params: { picture: string, id: string } }) {
  const S3 = getS3();

  const description = await getDescription(S3, `collections/${params.id}/${decodeURIComponent(params.picture)}/description.txt`);

  if (!description) {
    redirect(`/collections/${params.id}`);
    return null;
  }

  const textValues = description?.split('||') || [];

  const allFiles = await S3.send(new ListObjectsCommand({
    Bucket: process.env.AWS_BUCKET,
    Prefix: `collections/${params.id}/${decodeURIComponent(params.picture)}`,
  }));

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
