import { useDiscordApi } from '@api/discord';
import { useQuery } from 'react-query';

const { me: meApi } = useDiscordApi();

export const useDiscordService = () => {
  const me = (payload: { accessToken?: string; discordToken?: string }) => {
    return useQuery(['discord-me', payload], () => meApi(payload));
  };

  return {
    me,
  };
};
