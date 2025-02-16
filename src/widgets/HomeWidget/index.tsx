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
  const [barChartData, setBarChartData] = useState<
    { district: string; adults: number; children: number; renters: number }[]
  >([]);
  const [areaChartData, setAreaChartData] = useState<
    { district: string; balance: number }[]
  >([]);

  useEffect(() => {
    usersApi.getAllUsers().then((e) => {
      const dataWithKeys = e.map((item: UserData) => ({
        ...item,
        key: item.iin || `${item.user_id}-${item.iin}`,
      }));
      setData(dataWithKeys);

      const barChartArr: {
        district: string;
        adults: number;
        children: number;
        renters: number;
      }[] = [];

      const areaChartArr: {
        district: string;
        balance: number;
      }[] = [];

      e.map((user: UserData) => {
        const obj = {
          district: user.district || 'null',
          adults: user.resident?.adults || 0,
          children: user.resident?.children || 0,
          // renters: user.resident?.renters || 3,
          renters: 3,
        };
        const obj2 = {
          district: user.district || 'null',
          balance: user.bonus?.balance || 0,
        };
        barChartArr.push(obj);
        areaChartArr.push(obj2);
      });

      setBarChartData(barChartArr);
      setAreaChartData(areaChartArr);

      // const residentsByDistrict: Record<
      //   string,
      //   { district: string; adults: number; children: number; renters: number }
      // > = {};
      // const bonusesByDistrict: Record<
      //   string,
      //   { district: string; balance: number }
      // > = {};

      // dataWithKeys.forEach(
      //   ({
      //     district,
      //     resident,
      //     bonus,
      //   }: {
      //     district: any;
      //     resident: any;
      //     bonus: any;
      //   }) => {
      //     if (!residentsByDistrict[district]) {
      //       residentsByDistrict[district] = {
      //         district,
      //         adults: 0,
      //         children: 0,
      //         renters: 0,
      //       };
      //     }
      //     if (!bonusesByDistrict[district]) {
      //       bonusesByDistrict[district] = { district, balance: 0 };
      //     }

      //     residentsByDistrict[district].adults += resident.adults;
      //     residentsByDistrict[district].children += resident.children;
      //     residentsByDistrict[district].renters += resident.renters;
      //     bonusesByDistrict[district].balance += bonus.balance;
      //   }
      // );

      // setBarChartData(Object.values(residentsByDistrict));
      // setAreaChartData(Object.values(bonusesByDistrict));
    });
  }, []);

  return (
    <MainLayout>
      <TableData columns={columns || []} dataSource={data} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
        }}
      >
        {barChartData && <BarChartComponent chartData={barChartData} />}
        {areaChartData && <AreaChartComponent chartData={areaChartData} />}
        {/* <AreaChartComponent /> */}
      </div>
      <div style={{ marginTop: '40px' }}>
        <MapWidget />
      </div>
    </MainLayout>
  );
};
