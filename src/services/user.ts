import { useUserApi } from '@api/user';
import { UserCreateType } from '@interface/user';
import { useMutation, useQuery } from 'react-query';

const { createUser: createUserApi, checkUsername: checkUsernameApi } =
  useUserApi();

export const useUserService = () => {
  const createUser = () => {
    return useMutation(([payload, discordTokens]: [UserCreateType, string]) =>
      createUserApi(payload, discordTokens)
    );
  };

  const checkUsername = (username: string) => {
    return useQuery(
      ['user-username', username],
      () => checkUsernameApi(username),
      {
        enabled: !!username,
      }
    );
  };

  return {
    createUser,
    checkUsername,
  };
};