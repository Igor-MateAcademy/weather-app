import React from 'react';
import cn from 'classnames';

import styles from './styles.module.css';

const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 flex justify-center items-center backdrop-blur-sm z-50">
      <div className={cn('absolute w-6 h-6 bg-indigo-200 rounded-full', styles.shadow)} />
      <div className={cn('flex justify-center items-center w-6 h-6 bg-indigo-300 rounded-full', styles.inner)} />
    </div>
  );
};

export default Loader;
