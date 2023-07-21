import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const businessOwnerDetailSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  ownerId: z.string().optional(),
  status: z.string().optional(),
});

export type BusinessOwnerDetailSchema = BaseSchema &
  z.infer<typeof businessOwnerDetailSchema>;
