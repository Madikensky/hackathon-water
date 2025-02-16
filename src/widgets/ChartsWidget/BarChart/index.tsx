'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

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

const chartConfig = {
  desktop: {
    label: 'Adults',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Children',
    color: 'hsl(var(--chart-2))',
  },
  tenants: {
    label: 'Tenants',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

interface BarChartProps {
  chartData?: {
    district: string;
    adults: number;
    children: number;
    renters: number;
  }[];
}

const mockBarChartData = [
  { district: 'Алмалинский', adults: 120, children: 80, tenants: 30 },
  { district: 'Бостандыкский', adults: 90, children: 60, tenants: 20 },
  { district: 'Медеуский', adults: 150, children: 100, tenants: 50 },
  { district: 'Ауэзовский', adults: 110, children: 70, tenants: 25 },
  { district: 'Турксибский', adults: 130, children: 90, tenants: 40 },
];

export const BarChartComponent: FC<BarChartProps> = ({ chartData }) => {
  return (
    <Card className="shadow-lg rounded-2xl p-4 bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Population by District
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
          Adults, Children, and Tenants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            // data={mockBarChartData}
            data={chartData}
            className="w-full h-80"
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              strokeOpacity={0.5}
            />
            <XAxis
              dataKey="district"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              className="text-gray-700 dark:text-gray-300"
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="adults"
              fill="#4F46E5"
              radius={[6, 6, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey="children"
              fill="#EC4899"
              radius={[6, 6, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey="tenants"
              fill="#10B981"
              radius={[6, 6, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
