import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const serviceCategorySchema = z.object({
  name: z.string(),
});

export type ServiceCategorySchema = BaseSchema &
  z.infer<typeof serviceCategorySchema>;
