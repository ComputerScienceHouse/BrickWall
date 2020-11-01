import axios from 'axios';

export const v1 = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL
});

export interface Connect {
  connect: {
    id: number;
  };
}

export interface Create<T> {
  create: T;
}

export default v1;
