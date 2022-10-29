import React from 'react';
import { useQuery } from 'react-query';

// components
import { Loader } from 'components';

// containers
import { Header, UsersList } from 'containers';

// queries
import { getAllUsers } from 'graphql/queries';

// context
import { UsersContext } from './context';

// styles
import 'sources/styles/styles.css';

const App: React.FC = () => {
  const { isLoading, data, refetch } = useQuery('get-all-users', () => getAllUsers());

  return (
    <>
      {isLoading && <Loader />}

      <UsersContext.Provider
        value={{
          update: refetch,
        }}
      >
        <Header />

        <main>
          <UsersList users={data} />
        </main>
      </UsersContext.Provider>
    </>
  );
};

export default App;
