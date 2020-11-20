import axios from 'axios';

axios.defaults.baseURL = process.env?.VUE_APP_API_BASE_URL;

axios.defaults.headers.common = {
  Accept: 'application/json, application/xml, text/play, text/html, *.*',
  'Content-Type': 'application/json'
};

export const httpClient = axios.create();

httpClient.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axios;
