'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Input, Flex, Typography, Button } from 'antd';
import about from './contact.jpg';
import './index.css';
import { sendEmail } from '../utils/send-email';

export default function Contact() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sendedMessage, setSended] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (email && message) {
      try {
        setEmail('');
        setMessage('');
        setLoading(true);
        await sendEmail({ email, message });
        setLoading(false);
        setSended('Email was sended!');
        setTimeout(() => {
          setSended('');
        }, 5000);
      } catch (e) {
        setLoading(false);
        setSended('Something went wrong! try later');
        setTimeout(() => {
          setSended('');
        }, 5000);
      }

    }
  };

  return (
    <div className='contact'>
      <Image src={about} alt='contact' />
      <div>
        <Flex gap='middle' align='flex-start' vertical>
          {sendedMessage && <Typography.Title level={4}>{sendedMessage}</Typography.Title>}
          <Typography.Text>Email *</Typography.Text>
          <Input
            size='large'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <Typography.Text>Message *</Typography.Text>
          <Input.TextArea
            autoSize={{ minRows: 10, maxRows: 10 }}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <Button
            onClick={onSubmit}
            disabled={!email || !message}
            loading={isLoading}
          >Submit</Button>
        </Flex>
      </div>
    </div>
  )
}
