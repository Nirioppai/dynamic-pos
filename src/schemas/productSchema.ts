import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const productSchema = z.object({
  ownerId: z.string(),
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  availability: z.enum(['Available', 'Unavailable']),
  category: z.string().optional(),
});

export type ProductSchema = BaseSchema & z.infer<typeof productSchema>;
