import React, { createContext } from 'react';

interface UsersCtx {
  update: () => Promise<any>;
}

export const UsersContext = createContext<UsersCtx>({
  update: async () => undefined,
});
