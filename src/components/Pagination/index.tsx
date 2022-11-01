import React from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';

interface Props {
  page: number;
  perPage: number;
  total: number;
  onChange: (page: number) => void;
  type?: 'expand' | 'compact';
  pageClassName?: string;
}

// styles
const button =
  'p-2 bg-indigo-200 border border-transparent rounded-full transition-all hover:border-indigo-400 disabled:pointer-events-none disabled:opacity-70';
const svg = 'w-4 h-4 text-indigo-400';

const Pagination: React.FC<Props> = ({ type = 'compact', page, perPage, total, onChange, pageClassName }) => {
  const isCompact = type === 'compact';
  const totalPages = Math.ceil(total / perPage);

  const pageHandler = (action: 'prev' | 'next') => {
    onChange(action === 'prev' ? page - 1 : page + 1);
  };

  return (
    <div className={cn('flex items-center', isCompact && 'justify-end')}>
      <div className={cn('flex gap-2 items-center mx-2', isCompact && 'gap-0')}>
        <button className={button} onClick={() => pageHandler('prev')} disabled={page === 1}>
          <ArrowLeftIcon className={svg} />
        </button>

        {isCompact && (
          <div className="flex justify-center items-center w-10">
            <span className={cn('text-xs text-darkblue', pageClassName)}>{`${page} / ${totalPages}`}</span>
          </div>
        )}

        <button className={button} onClick={() => pageHandler('next')} disabled={page === totalPages}>
          <ArrowRightIcon className={svg} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
