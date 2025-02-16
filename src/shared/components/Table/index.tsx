import React from 'react';
import { Table } from 'antd';
import { ColumnGroupType, ColumnProps, ColumnsType } from 'antd/es/table';

export interface UserData {
  user_id: number;
  iin: string;
  address: string;
  phone: string;
  is_verified: boolean;
  resident: {
    adults: number;
    children: number;
    renters: number;
  };
  bonus: {
    balance: number;
    lastUpdate: string;
  };
}

type TableColumnType = ColumnsType<UserData>;

interface TableDataProps {
  columns: TableColumnType;
  dataSource: UserData[];
}

export const TableData: React.FC<TableDataProps> = ({
  columns,
  dataSource,
}) => <Table<UserData> columns={columns} dataSource={dataSource} />;
