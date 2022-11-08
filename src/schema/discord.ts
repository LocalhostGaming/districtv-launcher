import { z } from 'zod';
import { UserSchema } from './user';

export const DiscordSchema = z.object({
  id: z.string(),
  user: UserSchema,
  discordId: z.string(),
  username: z.string(),
  email: z.string(),
  discriminator: z.string(),
  avatar: z.string(),
  refreshToken: z.string(),
});
