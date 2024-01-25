import axios from 'axios';
import store from './src/store';

const instance = axios.create({
  baseURL:
    process.env['REACT_APP_BUILD_MODE'] === 'PRODUCTION'
      ? 'https://vccoreapi.stage.sharp-dev.net/'
      : 'https://vccoreapidev.stage.sharp-dev.net/',
});

instance.interceptors.request.use(
  (config) => {
    const { token } = store.getState().user;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
