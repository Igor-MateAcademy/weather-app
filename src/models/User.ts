export interface User {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  timezone: string;
}

export type NewUser = Omit<User, 'id'>;
