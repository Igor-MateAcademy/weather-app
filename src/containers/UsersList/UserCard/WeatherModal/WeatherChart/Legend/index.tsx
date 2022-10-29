import React from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const CustomLegend: React.FC<any> = props => {
  const { value, color } = props.payload[0];

  return (
    <div className="flex justify-center items-center gap-2">
      <ArrowTrendingUpIcon className="w-6 h-6" style={{ stroke: color }} />

      <span style={{ color }}>{value}</span>
    </div>
  );
};

export default CustomLegend;
