import React from 'react';
import { MapIcon, UserPlusIcon } from '@heroicons/react/24/outline';

// components
import { Text, Button } from 'components';
import CreateUserModal from './CreateUserModal';

const Header: React.FC = () => (
  <header className={'flex justify-between content-center mb-8 py-4 px-8'}>
    <div className="flex justify-center content-center space-x-4">
      <MapIcon className="h-8 w-8 stroke-indigo-400" />

      <h1 className="m-0 text-xl">
        <Text>Weather App</Text>
      </h1>
    </div>

    <CreateUserModal>
      <Button
        className="bg-indigo-300/[.09] hover:bg-indigo-300/[.5] transition-all"
        prefix={<UserPlusIcon className="w-6 h-6 stroke-indigo-400" />}
      >
        <Text className="text-base">Add user</Text>
      </Button>
    </CreateUserModal>
  </header>
);

export default Header;
