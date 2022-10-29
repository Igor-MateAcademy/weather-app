import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Legend, Tooltip } from 'recharts';

// components
import CustomTooltip from './Tooltip';
import CustomLegend from './Legend';
import AxisTick from './AxisTick';

// models
import { ForecastData } from 'models';

interface Props {
  data: ForecastData[];
}

const WeatherChart: React.FC<Props> = ({ data }) => {
  const getGradientOffset = () => {
    const dataMax = Math.max(...data.map(i => i.degrees));
    const dataMin = Math.min(...data.map(i => i.degrees));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  return (
    <>
      {data && (
        <AreaChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={getGradientOffset()} stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset={getGradientOffset()} stopColor="#d1507f" stopOpacity={0.4} />
            </linearGradient>
          </defs>

          <XAxis dataKey="name" tickLine={false} tick={<AxisTick dy={10} />} />
          <YAxis tickLine={false} tickCount={4} allowDecimals={false} tick={<AxisTick dx={-10} format={true} />} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            payload={[
              {
                value: 'Temperature',
                color: '#8884d8',
              },
            ]}
            content={<CustomLegend />}
          />
          <Area
            type="monotone"
            dataKey="degrees"
            stroke="#8884d8"
            activeDot={{ r: 4 }}
            fillOpacity={1}
            fill="url(#areaColor)"
          />
        </AreaChart>
      )}
    </>
  );
};

export default WeatherChart;
