import type { MenuProps } from 'antd';
import { Dropdown as AntDropdown, Space } from 'antd';

interface IProps {
  title: string;
  items: MenuProps['items'];
  open?: boolean;
}

export const Dropdown = ({
  title,
  items,
  open
}: IProps) => (
  <AntDropdown open={open} menu={{ items }} className='hover-underline-animation'>
    <Space>
      {title}
    </Space>
  </AntDropdown>
);

export default Dropdown;
