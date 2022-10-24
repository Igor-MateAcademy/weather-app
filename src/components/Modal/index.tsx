import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import cn from 'classnames';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface Props {
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<Props> = ({ open, onToggle, children, className }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={onToggle}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-70"
          leave="ease-in duration-200"
          leaveFrom="opacity-70"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-1000 overflow-y-auto">
          <div className="flex justify-center items-center h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel
                className={cn(
                  'relative min-h-modal min-w-modal transform rounded-lg bg-white shadow-xl transition-all',
                  className
                )}
              >
                <button
                  className="absolute top-cross right-cross p-1 outline-0 border-0 rounded-full  hover:bg-gray-200 transition"
                  onClick={onToggle}
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>

                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
