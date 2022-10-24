import React, { ReactNode } from 'react';
import cn from 'classnames';

interface Props {
  children: ReactNode;
  prefix?: ReactNode;
  affix?: ReactNode;
  className: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ children, prefix, affix, className, onClick }) => {
  return (
    <button
      className={cn('flex justify-center content-center space-x-2 px-2 py-1 rounded', className)}
      onClick={onClick}
    >
      {prefix}
      {children}
      {affix}
    </button>
  );
};

export default Button;
