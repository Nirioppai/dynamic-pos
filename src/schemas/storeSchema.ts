import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const storeSchema = z.object({
  // TODO: CHANGE TO ACTUAL STORE SCHEMA
  userId: z.string(),
  name: z.string(),
  address: z.string(),
});

export type StoreSchema = BaseSchema & z.infer<typeof storeSchema>;
