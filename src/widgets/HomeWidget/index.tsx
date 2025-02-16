import { MainLayout } from '@/shared/components/Layouts/MainLayout';
import { UserData, TableData } from '@/shared/components/Table';
import { columns } from './columns';
import { useEffect, useState } from 'react';
import { usersApi } from '@/shared/api/users';
import { mapApi } from '@/shared/api/map';
import { BarChartComponent } from '../ChartsWidget/BarChart';
import { AreaChartComponent } from '../ChartsWidget/AreaChart';
import { MapCoordinate } from '@/shared/api/map';
import { MapWidget } from '../MapWidget';

export const HomeWidget = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [mapCoordinates, setMapCoordinates] = useState<MapCoordinate[]>([]);

  useEffect(() => {
    usersApi.getAllUsers().then((e) => {
      const dataWithKeys = e.map((item: UserData) => ({
        ...item,
        key: item.iin || `${item.user_id}-${item.iin}`,
      }));
      setData(dataWithKeys);
    });
  }, []);

  // useEffect(() => {
  //   mapApi.getMapPoints().then((e) => {
  //     setMapCoordinates(e);
  //   });
  // }, []);

  return (
    <MainLayout>
      {/* <TableData columns={columns || []} dataSource={data} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        <BarChartComponent />
        <AreaChartComponent />
      </div> */}
      <MapWidget />
    </MainLayout>
  );
};
