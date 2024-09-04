import Link from 'next/link';
import './Toolbar.css';
import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { InstagramOutlined, MailOutlined } from '@ant-design/icons';
import Dropdown from './Dropdown';
import Menu from './Menu';
import { getS3 } from '../utils/s3';

const getElemes = (names: string[], target: string) => (
  names.map((name, id) => ({
    key: `${name}_${id}`,
    label: <Link className='dropdown_link' href={`/${target}/${name}`}>{name}</Link>
  }))
);

const extractNames = (data: Array<any> = []) => {
  const map: any = {};
  data.forEach((value) => {
    const path = value.Key.split('/');
    if (path[1]) {
      map[path[1]] = true;
    }
  });
  return Object.keys(map);
};

export default async function Toolbar() {

  const S3 = getS3();

  const collection = await S3.send(new ListObjectsCommand({ Bucket: process.env.AWS_BUCKET, Prefix: 'collections' }));
  const exhibition = await S3.send(new ListObjectsCommand({ Bucket: process.env.AWS_BUCKET, Prefix: 'exhibitions' }));
  const collectionNames = extractNames(collection.Contents);
  const exhibitionNames = extractNames(exhibition.Contents);

  return (
    <div className='toolbar'>
      <div className='toolbar_left'>
        <Link href='/'>strauss anastasia</Link>
      </div>
      <div className='toolbar_right'>
        <Dropdown title='collections' items={getElemes(collectionNames, 'collections')} />
        <Dropdown title='exhibitions' items={getElemes(exhibitionNames, 'exhibitions')} />
        <Link className='dropdown_link' href={`/about/`}>about</Link>
        <Link className='dropdown_link' href={`/contact`}>
          <MailOutlined />
        </Link>
        <Link className='dropdown_link' href='https://www.instagram.com/anastasia.strauss?igsh=MWc4MnY0ZG52dGlhMw=='>
          <InstagramOutlined />
        </Link>
      </div>
      <Menu
        collectionNames={collectionNames}
        exhibitionNames={exhibitionNames}
      />
    </div>
  );
}
