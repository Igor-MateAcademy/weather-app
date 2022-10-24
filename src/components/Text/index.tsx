import React from 'react';
import cn from 'classnames';

interface Props {
  children: string;
  className?: string;
}

const Text: React.FC<Props> = props => {
  return <span className={cn('text-indigo-400', props.className)}>{props.children}</span>;
};

export default Text;
