import axios from '@utils/axios';
import { ENDPOINTS } from '@constants/endpoints';
import jwt from '@utils/jwt';
import {
  IDiscordAuthUrl,
  IDiscordMe,
  IDiscordMePayload,
} from 'src/interfaces/IDiscord';

const { INTEGRATION } = ENDPOINTS;

export const useDiscordApi = () => {
  const getAuthorizationUrl = async () => {
    const response = await axios.get<IDiscordAuthUrl>(
      INTEGRATION.DISCORD.AUTHORIZATION_URL,
      {
        params: {
          intent: 'launcher',
        },
      }
    );

    return response.data;
  };

  const verifyToken = async (code: string, state: string) => {
    const response = await axios.get<{ tokens: string }>(
      INTEGRATION.DISCORD.TOKEN.VERIFY,
      {
        params: {
          code,
          state,
        },
      }
    );

    return response.data;
  };

  const me = async (payload: IDiscordMePayload) => {
    const { accessToken, discordToken } = payload;

    if (accessToken) {
      const response = await axios.get<IDiscordMe>(INTEGRATION.DISCORD.ME, {
        params: {
          access_token: accessToken,
        },
      });
      return response.data;
    }

    if (discordToken) {
      const { payload: tokens } = await jwt.verify(discordToken);

      if (!tokens?.access_token) return undefined;

      const response = await axios.get<IDiscordMe>(INTEGRATION.DISCORD.ME, {
        params: {
          access_token: tokens.access_token,
        },
      });
      return response.data;
    }

    return undefined;
  };

  return {
    getAuthorizationUrl,
    verifyToken,
    me,
  };
};
