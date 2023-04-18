import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const productCategorySchema = z.object({
  ownerId: z.string(),
  name: z.string(),
});

export type ProductCategorySchema = BaseSchema &
  z.infer<typeof productCategorySchema>;
