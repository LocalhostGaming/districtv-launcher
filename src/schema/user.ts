import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  role: z.enum(['PLAYER', 'MASTER']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const UserCreateSchema = z.object({
  username: z.string().min(4).max(32),
  password: z.string().min(6).max(100),
});

export const CheckUsernameSchema = z.object({
  exists: z.boolean(),
});
