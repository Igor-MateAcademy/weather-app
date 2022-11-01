import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'react-query';
import _ from 'lodash';

// components
import { Loader, Pagination, Input, Select, Button } from 'components';

// containers
import { Header, UsersList } from 'containers';

// queries
import { getUsers, getAllUsers } from 'graphql/queries';

// models
import { User, NewUser } from 'models';

// context
import { UsersContext } from './context';

// styles
import 'sources/styles/styles.css';

interface Sort {
  sortField: keyof NewUser | 'None';
  sortOrder: 'ASC' | 'DESC';
}

const PER_PAGE = 4;
const ORDER = ['ASC', 'DESC'];
const SORTBY = ['None', 'firstName', 'lastName', 'city', 'country'];

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [sort, setSort] = useState<Sort>({
    sortField: 'None',
    sortOrder: 'ASC',
  });
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const allUsers = useQuery('get-all-users', () => getAllUsers());
  const { isLoading, refetch } = useQuery(
    'get-users',
    () => getUsers(page, PER_PAGE, sort.sortField, sort.sortOrder, { q: query }),
    {
      onSuccess: (data: User[]) => setUsers(data),
    }
  );

  const isInputAvailable = sort.sortField !== 'None';
  const isSortAvailable = query.length !== 0;

  const pageHandler = (page: number) => {
    setPage(page);
  };

  const sortHandler = (field: 'sortField' | 'sortOrder') => (value: string) => {
    if (value === 'None') {
      setSort({ sortField: value, sortOrder: 'ASC' });

      return;
    }

    setSort({
      ...sort,
      [field]: value,
    });
  };

  const queryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setQuery(value);

    if (value.length === 0) debouncedRefetch();
  };

  const update = async () => {
    await allUsers.refetch();
    await refetch();
  };

  const debouncedRefetch = useCallback(_.debounce(refetch, 1500), []);

  useEffect(() => {
    refetch();
  }, [page, sort]);

  return (
    <>
      {isLoading && <Loader />}

      <UsersContext.Provider
        value={{
          update: update,
          page: page,
          setPage: pageHandler,
          usersCount: users.length,
        }}
      >
        <Header />

        <main className="container mx-auto">
          <div className="flex items-end justify-between gap-8 mb-8">
            <div className="flex items-center gap-8">
              <Select
                label="Sort by"
                labelClassName="text-sky-200"
                options={SORTBY}
                value={sort.sortField}
                onSelect={sortHandler('sortField')}
                disabled={isSortAvailable}
              />

              <Select
                label="Sort order"
                labelClassName="text-sky-200"
                options={ORDER}
                value={sort.sortOrder}
                onSelect={sortHandler('sortOrder')}
                disabled={sort.sortField === 'None' || isSortAvailable}
              />
            </div>

            <div className="flex gap-4">
              <Input value={query} onChange={queryHandler} disabled={isInputAvailable} />

              <Button
                className="min-h-input h-min bg-blue-200 border-0 rounded"
                onClick={refetch}
                disabled={isInputAvailable}
              >
                Search
              </Button>
            </div>
          </div>

          <UsersList users={users} />

          <Pagination
            page={page}
            perPage={PER_PAGE}
            total={allUsers.data ? allUsers.data.length : 0}
            onChange={pageHandler}
            pageClassName="text-sky-200"
          />
        </main>
      </UsersContext.Provider>
    </>
  );
};

export default App;
