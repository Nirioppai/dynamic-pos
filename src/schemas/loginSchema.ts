import { z } from 'zod';

export const loginSchema = z.object({
  accountNumber: z.string().min(1),
  password: z.string().min(1),
  userType: z.string().optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
