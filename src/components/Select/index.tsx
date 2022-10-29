import React, { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import _ from 'lodash';

import { Empty } from 'components';

const { Option, Options } = Combobox;

interface Props {
  label: string;
  value?: string;
  options: string[];
  disabled?: boolean;
  required?: boolean;
  onSelect?: (value: string) => void;
}

const Select: React.FC<Props> = ({ label, value, options, required, disabled, onSelect }) => {
  const [query, setQuery] = useState<string>('');
  const filteredOptions =
    query === ''
      ? options
      : options.filter(option =>
          option.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

  const queryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      {label && <label className="mb-1 font-medium">{label}</label>}
      {label && required && <span className="text-rose-600">*</span>}

      <Combobox as="div" className="relative mb-4" value={value} onChange={onSelect} disabled={disabled}>
        <div className="group relative w-full max-w-input transition">
          <Combobox.Input
            onChange={queryHandler}
            className="flex items-stretch pl-3 pr-6 min-h-input w-full max-w-input rounded-md border-2 border-indigo-300 outline-0 hover:border-indigo-400 focus:bg-blue-100 transition-all overflow-hidden"
          />

          <Combobox.Button className="absolute right-2 top-arrow">
            <ChevronDownIcon className="w-5 h-5 text-indigo-300 group-hover:text-indigo-400" />
          </Combobox.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Options
            as="ul"
            className="absolute left-0 max-h-40 w-full max-w-input mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-scroll z-50"
          >
            {filteredOptions.length === 0 && <Empty />}

            {filteredOptions.map((option: string) => (
              <Option
                as="li"
                className="py-2 px-4 hover:bg-gray-200 hover:cursor-pointer transition-all"
                key={_.uniqueId(option)}
                value={option}
              >
                {option}
              </Option>
            ))}
          </Options>
        </Transition>
      </Combobox>
    </div>
  );
};

export default Select;
