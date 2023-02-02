import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const storeSchema = z.object({
  ownerId: z.string(),
  name: z.string(),
  address: z.string(),
  products: z.string().array().optional(),
});

export type StoreSchema = BaseSchema & z.infer<typeof storeSchema>;
