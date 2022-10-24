import React from 'react';

// components
import { Text, Empty } from 'components';

interface Props {
  users: any[];
}

const UsersList: React.FC<Props> = props => {
  return (
    <div className="container mx-auto p-4 h-full rounded-lg bg-darkblue shadow-primary">
      {props.users.length === 0 && <Empty fill="text-white" />}
    </div>
  );
};

export default UsersList;
