import { useAuthApi } from '@api/auth';
import { LoginType } from '@interface/auth';
import { useMutation } from 'react-query';

const { login: loginApi, logout: logoutApi } = useAuthApi();

export const useAuthService = () => {
  const login = () => {
    return useMutation((payload: LoginType) => loginApi(payload));
  };

  const logout = () => {
    logoutApi();
  };

  return {
    login,
    logout,
  };
};
