import React from 'react';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';

interface Props {
  fill?: string;
}

const Empty: React.FC<Props> = ({ fill }) => (
  <div className="flex flex-col content-center items-center p-4">
    <FaceFrownIcon className={cn('mb-2 w-7 h-7', fill)} />

    <span className={fill}>Not found</span>
  </div>
);

export default Empty;
