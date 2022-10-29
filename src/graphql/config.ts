import { GraphQLClient } from 'graphql-request';

const path = process.env.REACT_APP_HOST || '';

export const graphQLClient = new GraphQLClient(path);
