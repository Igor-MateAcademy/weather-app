import { gql } from 'graphql-request';
import { graphQLClient } from '../config';

// models
import { NewUser } from 'models';

// utils
import { convertParams } from 'utils';

export const getAllUsers = async () => {
  const { users } = await graphQLClient.request(gql`
    {
      users: allUsers {
        id
        firstName
        lastName
        country
        timezone
        city
      }
    }
  `);

  return users;
};

export const getUsers = async (
  page: number,
  perPage: number,
  sortField: keyof NewUser | 'None',
  sortOrder: 'ASC' | 'DESC',
  filter: { q: string }
) => {
  const obj = {
    page: page - 1,
    perPage,
  };

  if (sortField !== 'None') {
    Object.assign(obj, { sortField, sortOrder });
  }

  const args = filter.q.length !== 0 ? convertParams(obj) + `, filter: { q: "${filter.q}" }` : convertParams(obj);

  const { data } = await graphQLClient.request(gql`
    {
      data: allUsers(${args}) {
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
