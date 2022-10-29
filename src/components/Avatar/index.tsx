import React, { useState, useEffect } from 'react';
import stringToColor from 'string-to-color';

interface Props {
  firstName: string;
  lastName: string;
  size: number;
}

const Avatar: React.FC<Props> = ({ firstName, lastName, size }) => {
  const [color, setColor] = useState('#000000');
  const [name, setName] = useState('?');

  const init = () => {
    if (firstName && lastName) {
      const abbr = firstName.split('')[0] + lastName.split('')[0];

      setName(abbr);
      setColor(stringToColor(abbr));
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{ backgroundColor: color, width: `${size}px`, height: `${size}px`, lineHeight: `${size}px` }}
      className="rounded-full font-semibold text-lg"
    >
      {name}
    </div>
  );
};

export default Avatar;
