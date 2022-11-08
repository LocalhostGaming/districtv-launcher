export const ENDPOINTS = {
  USER: '/users',
  AUTH: {
    LOGIN: '/auth/login',
  },
  INTEGRATION: {
    DISCORD: {
      AUTHORIZATION_URL: '/integration/discord/authorization-url',
      TOKEN: {
        VERIFY: '/integration/discord/token/verify',
        REFRESH: '/integration/discord/token/refresh',
      },
      ME: '/integration/discord/me',
    },
  },
  DISCORD: {
    AUTHORIZE: 'https://discord.com/oauth2/authorize',
    TOKEN: 'https://discord.com/api/oauth2/token',
    REVOKE: 'https://discord.com/api/oauth2/token/revoke',
  },
};
