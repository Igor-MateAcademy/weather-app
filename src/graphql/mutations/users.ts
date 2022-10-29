import { gql } from 'graphql-request';
import { graphQLClient } from '../config';

// models
import { User, NewUser } from 'models';

// utils
import { convertParams } from 'utils';

export const deleteUserById = async (id: string) => {
  await graphQLClient.request(gql`
    mutation deleteUserById {
      removeUser(id: "${id}") {
        id
      }
    }
  `);
};

export const addUser = async (user: NewUser) => {
  const args = convertParams(user);

  const { data } = await graphQLClient.request(gql`
    mutation addUser {
      createUser(${args}) {
        id
        firstName
        lastName
        country
        timezone
        city
      }
    }
  `);

  return data;
};

export const updateUser = async (user: Partial<User>) => {
  const args = convertParams(user);

  const { data } = await graphQLClient.request(gql`
    mutation updateUser {
      updateUser(${args}) {
        id
        firstName
        lastName
        country
        timezone
        city
      }
    }
  `);

  return data;
};
