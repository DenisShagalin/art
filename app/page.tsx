import { ListObjectsCommand } from "@aws-sdk/client-s3";
import Carousel from './common/Carousel';
import { getS3, getImagesKeys, getSignedUrl } from './utils/s3';

export default async function Home() {

  const S3 = getS3();

  const home = await S3.send(new ListObjectsCommand({ Bucket: process.env.AWS_BUCKET, Prefix: 'home' }));
  const names = getImagesKeys(home?.Contents);

  const src: string[] = [];
  for (let name in names) {
    const url = await getSignedUrl(S3, names[name]);
    src.push(decodeURIComponent(url));
  }

  return (
    <div className='home_page'>
      <Carousel loading={!src.length} autoplay>
        {src.map(url =>
          <div key={url}>
            <img src={url} style={{ width: '99%' }} />
          </div>
        )}
      </Carousel>
    </div>
  );
}
