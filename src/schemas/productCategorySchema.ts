import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const productCategorySchema = z.object({
  name: z.string(),
});

export type ProductCategorySchema = BaseSchema &
  z.infer<typeof productCategorySchema>;
