import Axios from 'axios';
import { ENV } from '@constants/env';

const axios = Axios.create({
  baseURL: ENV.ROOT_API,
});

axios.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = await window.electron.storage.get('access_token');

      // eslint-disable-next-line no-param-reassign
      config.headers = {
        ...config.headers,
        Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      };
    } catch (error) {
      return config;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axios;
