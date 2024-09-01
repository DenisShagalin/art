import Link from 'next/link';
import { InstagramOutlined, MailOutlined } from '@ant-design/icons';
import Toolbar from './common/Toolbar';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta name='description' content='STRAUSS ANASTASIA' />
        <meta name='keywords' content='STRAUSS ANASTASIA, strauss anastasia, Vienn' />
        <title>STRAUSS ANASTASIA</title>
      </head>
      <body>
        <div className='app'>
          <Toolbar />
          {children}
          <div className='footer'>
            <Link className='dropdown_link' href={`/contact`}>
              <MailOutlined />
            </Link>
            <Link className='dropdown_link' href='https://www.instagram.com/anastasia.strauss?igsh=MWc4MnY0ZG52dGlhMw=='>
              <InstagramOutlined />
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
