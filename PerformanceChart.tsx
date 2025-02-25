import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';

interface ChartData {
  name: string;
  achievement: number;
  target: number;
}

interface PerformanceChartProps {
  data: ChartData[];
}

export function PerformanceChart({ data }: PerformanceChartProps) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-800 rounded-lg">
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  // Sort data by achievement in descending order for better visualization
  const sortedData = [...data].sort((a, b) => b.achievement - a.achievement);

  const formatValue = (value: number) => {
    if (typeof value !== 'number') return '0';
    return new Intl.NumberFormat('en-EG', {
      style: 'currency',
      currency: 'EGP',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getPercentage = (achievement: number, target: number) => {
    return ((achievement / target) * 100).toFixed(0) + '%';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const achievement = payload[0].value;
      const target = payload[1].value;
      const percentage = getPercentage(achievement, target);
      
      return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-700">
          <p className="text-white font-semibold mb-2">{label}</p>
          <div className="space-y-1">
            <p className="text-[#35de75]">
              Achievement: {formatValue(achievement)}
            </p>
            <p className="text-red-400">
              Target: {formatValue(target)}
            </p>
            <p className={`font-semibold ${
              achievement >= target ? 'text-[#35de75]' : 'text-yellow-500'
            }`}>
              Progress: {percentage}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    return (
      <div className="flex justify-center gap-6 mt-4">
        {payload.map((entry: any, index: number) => (
          <div
            key={`item-${index}`}
            className="flex items-center gap-2"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-gray-300">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={sortedData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          barGap={0}
          barSize={20}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            angle={-45}
            textAnchor="end"
            height={80}
            tickMargin={5}
          />
          <YAxis
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
            tickFormatter={formatValue}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          <ReferenceLine
            y={0}
            stroke="#374151"
          />
          <Bar
            name="Achievement"
            dataKey="achievement"
            fill="#35de75"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            name="Target"
            dataKey="target"
            fill="#ef4444"
            radius={[4, 4, 0, 0]}
            opacity={0.7}
          />
        </BarChart>
      </ResponsiveContainer> </div>
  );
}