import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const cashierSchema = z.object({
  ownerId: z.string(),
  name: z.string(),
  storeId: z.string().optional(),
});

export type CashierSchema = BaseSchema & z.infer<typeof cashierSchema>;
