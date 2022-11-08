import { z } from 'zod';

export const CitizenSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dob: z.date(),
  gender: z.enum(['male', 'female', 'other']),
});
