import React, { useContext } from 'react';
import { useMutation } from 'react-query';
import _ from 'lodash';

// components
import { Empty } from 'components';
import UserCard from './UserCard';

// mutations
import { deleteUserById } from 'graphql/mutations';

// context
import { UsersContext } from 'containers/App/context';

// models
import { User } from 'models';

interface Props {
  users: User[];
}

const UsersList: React.FC<Props> = ({ users }) => {
  const { update } = useContext(UsersContext);
  const { mutateAsync } = useMutation(['delete-user'], (id: string) => deleteUserById(id), {
    onError: (e: string) => {
      console.log('Error', e);
    },
  });

  const deleteUser = async (id: string) => {
    await mutateAsync(id);
    await update();
  };

  return (
    <div className="container mx-auto p-4 h-full rounded-lg bg-darkblue shadow-primary">
      {_.isUndefined(users) || users.length === 0 ? (
        <Empty fill="text-white" />
      ) : (
        <ul className="grid grid-cols-4 gap-4 mb-0">
          {users.map(user => (
            <UserCard {...user} key={user.id} onDelete={deleteUser} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
