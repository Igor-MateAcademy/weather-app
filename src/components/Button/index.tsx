import React, { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  children: ReactNode;
  prefix?: ReactNode;
  affix?: ReactNode;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({ children, prefix, affix, className, onClick, isLoading, disabled }) => {
  return (
    <button
      className={cn(
        'flex justify-center content-center space-x-2 px-2 py-1 rounded transition-all disabled:bg-gray-300',
        isLoading && 'disabled:cursor-wait',
        className
      )}
      onClick={onClick}
      disabled={isLoading || disabled}
    >
      {prefix}
      {children}
      {affix}
    </button>
  );
};

export default Button;
