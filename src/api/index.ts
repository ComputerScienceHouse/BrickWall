import axios from 'axios';

export const v1 = axios.create({
  baseURL: process.env.REACT_APP_API_BASEURL
});

export default v1;
