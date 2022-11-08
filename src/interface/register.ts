import { RegisterSchema } from '@schema/register';
import { z } from 'zod';

export type RegisterType = z.infer<typeof RegisterSchema>;
