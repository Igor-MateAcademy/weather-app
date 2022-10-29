import axios from 'axios';

export const weatherAPI = axios.create({
  baseURL: process.env.REACT_APP_WEATHER_HOST,
  validateStatus: (status: number) => status >= 200 && status < 500,
});

export const timezoneAPI = axios.create({
  baseURL: process.env.REACT_APP_TIMEZONEDB_HOST,
  validateStatus: (status: number) => status >= 200 && status < 500,
});
