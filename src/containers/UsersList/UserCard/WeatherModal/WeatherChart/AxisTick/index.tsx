import React from 'react';

const AxisTick: React.FC<any> = props => (
  <text {...props} fontWeight={200} fontSize={12} stroke="#8884d8" textAnchor="middle">
    {props.format ? `${props.payload.value}℃` : props.payload.value}
  </text>
);

export default AxisTick;
