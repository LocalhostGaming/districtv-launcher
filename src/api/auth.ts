import { ENDPOINTS } from '@constants/endpoints';
import { LoginResponseType, LoginType } from '@interface/auth';
import axios from '@utils/axios';

export const useAuthApi = () => {
  const login = async (payload: LoginType) => {
    const response = await axios.post<LoginResponseType>(
      ENDPOINTS.AUTH.LOGIN,
      payload
    );

    return response.data;
  };

  const logout = () => {
    window.electron.storage.delete('access_token');
  };

  return {
    login,
    logout,
  };
};
