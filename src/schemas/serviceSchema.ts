import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const serviceSchema = z.object({
  ownerId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
  // Duration
  category: z.string(),
  // Tax
  availability: z.enum(['Available', 'Unavailable']),
  // Add ons
  // Combinations
  // Restrictions
});

export type ServiceSchema = BaseSchema & z.infer<typeof serviceSchema>;
