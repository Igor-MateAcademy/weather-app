import React, { createContext } from 'react';

interface UsersCtx {
  update: () => Promise<any>;
  page: number;
  setPage: (page: number) => void;
  usersCount: number;
}

export const UsersContext = createContext<UsersCtx>({
  update: async () => undefined,
  page: 1,
  setPage: () => undefined,
  usersCount: 0,
});
