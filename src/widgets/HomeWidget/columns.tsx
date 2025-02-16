import { UserData } from '@/shared/components/Table';
import { Space, TableProps, Tag } from 'antd';

export const columns: TableProps<UserData>['columns'] = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'UserId',
    dataIndex: 'userId',
    key: 'userId',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'IIN',
    dataIndex: 'iin',
    key: 'iin',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'IsVerified',
    dataIndex: 'isVerified',
    key: 'isVerified',
    render: (text) => {
      return <a>{`${text}`}</a>;
    },
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'District',
    dataIndex: 'district',
    key: 'district',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Residents',
    key: 'residents',
    dataIndex: 'resident',
    children: [
      {
        title: 'Adults',
        key: 'adults',
        dataIndex: ['resident', 'adults'],
        render: (adults, record) => {
          return <Tag color="green">{adults || 'null'}</Tag>;
        },
      },
      {
        title: 'Children',
        key: 'children',
        dataIndex: ['resident', 'children'],
        render: (children, record) => {
          return <Tag color="volcano">{children || 'null'}</Tag>;
        },
      },
      {
        title: 'Renters',
        key: 'renters',
        dataIndex: ['resident', 'renters'],
        render: (renters, record) => {
          return <Tag color="geekblue">{renters || 'null'}</Tag>;
        },
      },
    ],
  },
  {
    title: 'Bonus balance',
    dataIndex: ['bonus'],
    key: 'bonus',
    render: (balance, record) => {
      console.log(balance); // Посмотри в консоли, что приходит
      return <span>{balance?.balance ?? 'null'}</span>;
    },
  },
];
