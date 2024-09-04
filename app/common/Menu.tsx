'use client'

import { useRouter } from 'next/navigation'
import { MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Menu as AntMenu } from 'antd';

const getItems = (items: string[], name: string) => {
  const children = items.map((label) => ({
    label,
    key: `/${name}/${label}`,
  }));
  return {
    key: name,
    label: name,
    children: children
  }
};

interface IProps {
  collectionNames: any[];
  exhibitionNames: any[]
}

const Menu = ({
  collectionNames,
  exhibitionNames
}: IProps) => {
  const router = useRouter();
  const [isOpened, open] = useState(false);

  const toggle = () => open(!isOpened);

  const onClick = (option: any) => {
    toggle();
    router.push(option.key);
  };

  return (
    <>
      <div className='toster'>
        <MenuOutlined onClick={toggle} />
      </div>
      {isOpened && (
        <div className='menu_wrapper'>
          <AntMenu
            onClick={onClick}
            style={{ width: '50%' }}
            mode="inline"
            items={[
              getItems(collectionNames, 'collections'),
              getItems(exhibitionNames, 'exhibitions'),
              {
                key: '/about',
                label: 'about',
              }
            ]}
          />
        </div>
      )}
    </>
  );
};

export default Menu;