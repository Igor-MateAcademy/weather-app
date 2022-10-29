import React from 'react';
import { UserCircleIcon, MapIcon, XMarkIcon, InformationCircleIcon, PencilIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';

// components
import { Avatar } from 'components';
import CreateUserModal from 'containers/Header/CreateUserModal';
import WeatherModal from './WeatherModal';

// models
import { User } from 'models';

interface Props extends User {
  onDelete: (id: string) => void;
}

const UserCard: React.FC<Props> = ({ id, firstName, lastName, city, country, timezone, onDelete }) => {
  const svg = 'w-5 h-5 stroke-indigo-400 fill-indigo-300';
  const actionSvg = 'w-4 h-4 text-indigo-400';
  const actionButton = 'border border-indigo-400 rounded opacity-0 group-hover:opacity-100 transition';

  return (
    <li>
      <button className="relative block flex flex-col items-center px-4 py-4 w-full min-h-card h-full bg-blue-200 rounded group">
        <div className="flex justify-center mb-4">
          <Avatar {...{ firstName, lastName }} size={56} />
        </div>

        <div>
          <div className="flex gap-3 mb-2 items-center">
            <UserCircleIcon className={svg} />

            <span className="text-darkblue">{firstName + ' ' + lastName}</span>
          </div>

          <div className="flex gap-3">
            <MapIcon className={svg} />

            <span className="text-darkblue">{city}</span>
          </div>
        </div>

        <WeatherModal city={city}>
          <button className={cn(actionButton, 'absolute top-2 left-2')}>
            <InformationCircleIcon className={actionSvg} />
          </button>
        </WeatherModal>

        <div className="absolute top-2 right-2">
          <CreateUserModal currentUser={{ id, firstName, lastName, city, country, timezone }}>
            <button className={cn(actionButton, 'mr-1')}>
              <PencilIcon className={actionSvg} />
            </button>
          </CreateUserModal>

          <button onClick={() => onDelete(id)} className={actionButton}>
            <XMarkIcon className={actionSvg} />
          </button>
        </div>
      </button>
    </li>
  );
};

export default UserCard;
