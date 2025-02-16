'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { FC } from 'react';

interface AreaChartProps {
  chartData: {}[];
}

export const balanceData = [
  { district: 'Медеуский', balance: 12 },
  { district: 'Турксибский', balance: 30 },
  { district: 'Алмалинский', balance: 5 },
  { district: 'Ауэзовский', balance: 6 },
  { district: 'Бостандыкский', balance: 40 },
  { district: 'Жетысуский', balance: 20 },
];

interface AreaChartComponentProps {
  chartData: { district: string; balance: number }[];
}

export const AreaChartComponent: FC<AreaChartComponentProps> = ({
  chartData,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bonus Balance per District</CardTitle>
        <CardDescription>Total bonuses by district</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            balance: { label: 'Balance', color: 'hsl(var(--chart-4))' },
          }}
        >
          {/* <AreaChart data={balanceData}> */}
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="district" tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="balance"
              fill="var(--color-balance)"
              stroke="var(--color-balance)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
