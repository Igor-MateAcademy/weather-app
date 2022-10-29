import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import cn from 'classnames';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string;
  validateStatus?: boolean;
  errorMessage?: string | undefined;
}

const Input: React.FC<Props> = ({ label, ...rest }) => {
  return (
    <div className="relative flex flex-col mb-4">
      <div>
        {label && <label className="mb-1 font-medium">{label}</label>}
        {label && rest.required && <span className="text-rose-600">*</span>}
      </div>

      <input
        autoFocus={false}
        className={cn(
          'p-0 pl-3 pr-5 m-0 min-h-input max-w-input w-full border-2 rounded-md border-indigo-300 hover:border-indigo-400 focus:bg-blue-100 outline-0 transition-all',
          !rest.validateStatus && 'border-red',
          rest.className
        )}
        {...rest}
      />

      <p>{rest.errorMessage}</p>
    </div>
  );
};

export default Input;
