import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './containers';
import { QueryClient, QueryClientProvider } from 'react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);
