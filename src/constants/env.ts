export const ENV = {
  DISCORD: {
    CLIENT_SECRET: import.meta.env.VITE_APP_DISCORD_CLIENT_SECRET,
    CLIENT_ID: import.meta.env.VITE_APP_DISCORD_CLIENT_ID,
  },
  ROOT_API: import.meta.env.VITE_APP_ROOT_API,
  JWT: {
    SECRET: import.meta.env.VITE_APP_JWT_SECRET,
    EXPIRATION: import.meta.env.VITE_APP_JWT_EXPIRATION,
  },
};
