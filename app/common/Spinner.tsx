import { Spin } from 'antd';

interface IProps {
  children: React.ReactNode;
  loading: boolean;
}

const Spinner: React.FC<IProps> = ({ children, loading }) => (
  loading ? (
    <div className='spinner'>
      <Spin spinning></Spin>
    </div>
  ) : children
);

export default Spinner;
