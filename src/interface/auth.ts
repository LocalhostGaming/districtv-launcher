import { LoginResponseSchema, LoginSchema } from '@schema/auth';
import { z } from 'zod';

export type LoginType = z.infer<typeof LoginSchema>;
export type LoginResponseType = z.infer<typeof LoginResponseSchema>;
