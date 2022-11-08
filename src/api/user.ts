import { ENDPOINTS } from '@constants/endpoints';
import { CheckUsernameType, UserCreateType, UserType } from '@interface/user';
import axios from '@utils/axios';
import { AxiosResponse } from 'axios';

export const useUserApi = () => {
  const createUser = async (payload: UserCreateType, discordTokens: string) => {
    const response = await axios.post<UserCreateType, AxiosResponse<UserType>>(
      ENDPOINTS.USER,
      payload,
      {
        params: {
          tokens: discordTokens,
        },
      }
    );

    return response.data;
  };

  const checkUsername = async (username: string) => {
    const response = await axios.get<CheckUsernameType>(
      `${ENDPOINTS.USER}/username/${username}`
    );

    return response.data;
  };

  return {
    createUser,
    checkUsername,
  };
};
