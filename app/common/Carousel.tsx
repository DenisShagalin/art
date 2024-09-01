'use client'

import { Carousel as AntCarousel } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import Spinner from './Spinner';
import './Carousel.css';

interface IProps {
  loading: boolean;
  children: any;
  autoplay?: boolean;
}

const Carousel: React.FC<IProps> = ({ children, loading, autoplay }) => {
  const ref: any = useRef();

  return (
    <Spinner loading={loading}>
      <div className='carousel'>
        <DoubleLeftOutlined onClick={() => ref.current?.prev()} />
        <div className='carousel_images'>
          <AntCarousel ref={ref} dots={false} adaptiveHeight fade autoplay={autoplay}>
            {children}
          </AntCarousel >
        </div>
        <DoubleRightOutlined onClick={() => ref.current?.next()} />
      </div>
    </Spinner>
  );
};

export default Carousel;
