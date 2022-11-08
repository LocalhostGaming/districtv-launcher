import {
  CheckUsernameSchema,
  UserCreateSchema,
  UserSchema,
} from '@schema/user';
import { z } from 'zod';

export type UserType = z.infer<typeof UserSchema>;
export type UserCreateType = z.infer<typeof UserCreateSchema>;
export type CheckUsernameType = z.infer<typeof CheckUsernameSchema>;
