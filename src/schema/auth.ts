import { z } from 'zod';

export const LoginSchema = z.object({
  username: z.string().min(4).max(32),
  password: z.string().min(6).max(100),
});

export const LoginResponseSchema = z.object({
  access_token: z.string().min(4).max(32),
});
