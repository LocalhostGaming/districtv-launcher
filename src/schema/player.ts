import { z } from 'zod';
import { CitizenSchema } from './citizen';
import { UserSchema } from './user';

export const PlayerSchema = z.object({
  id: z.string(),
  user: UserSchema,
  citizen: CitizenSchema,
  position: z.object({}).nullable(),
  stats: z.object({}).nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
