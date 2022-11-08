import { z } from 'zod';

export const RegisterSchema = z
  .object({
    username: z.string().min(4).max(32),
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });
