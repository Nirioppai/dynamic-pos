import { z } from 'zod';

export const userSchema = z.object({
  email: z.string(),
  name: z.string(),
  ownerId: z.string(),
  status: z.string(),
  timestamp: z.string(),
  userType: z.string(),
});

export type UserSchema = z.infer<typeof userSchema>;
