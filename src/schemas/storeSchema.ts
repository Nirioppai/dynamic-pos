import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const storeSchema = z.object({
  ownerId: z.string(),
  name: z
    .string()
    .refine((value) => value.trim() !== '', 'Must not be empty or whitespace'),
  address: z
    .string()
    .refine((value) => value.trim() !== '', 'Must not be empty or whitespace')
    .optional(),
  // Array of IDs
  products: z.string().array().optional(),
  services: z.string().array().optional(),
  categories: z.string().array().optional(),
  cashiers: z.string().array().optional(),
});

export type StoreSchema = BaseSchema & z.infer<typeof storeSchema>;
