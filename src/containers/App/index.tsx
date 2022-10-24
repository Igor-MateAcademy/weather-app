import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useQuery } from 'react-query';
import { GraphQLClient, gql } from 'graphql-request';

// components
import { Text } from 'components';

// containers
import { Header, UsersList } from 'containers';

import 'sources/styles/styles.css';
import 'antd/dist/antd.css';

const path = 'http://localhost:4000';

const App: React.FC = () => {
  const graphQLClient = new GraphQLClient(path);

  const init = async () => {
    const response = await graphQLClient.request(gql`
      query {
        data: allUsers {
          id
          firstName
          lastName
        }
      }
    `);
    console.log(response);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <BrowserRouter>
      <Header />

      <main>
        <UsersList users={[]} />
      </main>
    </BrowserRouter>
  );
};

export default App;
