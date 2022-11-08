import { useDiscordApi } from '@api/discord';
import { useQuery } from 'react-query';
import { IDiscordMe, IDiscordMePayload } from 'src/interface/IDiscord';

const { me: meApi } = useDiscordApi();

export const useDiscordService = () => {
  const me = (payload?: IDiscordMePayload) => {
    return useQuery<IDiscordMe | undefined>(
      ['discord-me', payload],
      () => meApi(payload || {}),
      {
        enabled: !!payload?.accessToken || !!payload?.discordToken,
      }
    );
  };

  return {
    me,
  };
};
