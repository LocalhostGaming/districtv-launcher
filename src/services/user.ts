import { useUserApi } from '@api/user';
import { UserCreateType, UserType } from '@interface/user';
import { useMutation, useQuery, UseQueryOptions } from 'react-query';

const {
  createUser: createUserApi,
  checkUsername: checkUsernameApi,
  me: meApi,
} = useUserApi();

export const useUserService = () => {
  const me = (options?: UseQueryOptions<UserType>) => {
    return useQuery<UserType>(['user-me'], () => meApi(), options);
  };

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
    me,
  };
};
