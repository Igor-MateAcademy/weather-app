import { gql } from 'graphql-request';
import { graphQLClient } from '../config';

export const getAllUsers = async () => {
  const { data } = await graphQLClient.request(gql`
    {
      data: allUsers {
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

export const getUserById = async (id: string) => {
  const { User } = await graphQLClient.request(gql`
    query getUserById {
      User(id: "${id}") {
        id
        firstName
        lastName
        country
        timezone
        city
      }
    }
  `);

  return User;
};
