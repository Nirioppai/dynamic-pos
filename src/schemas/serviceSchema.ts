import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const serviceSchema = z.object({
  ownerId: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  availability: z.enum(['Available', 'Unavailable']),
  category: z.string(),
});

export type ServiceSchema = BaseSchema & z.infer<typeof serviceSchema>;
