import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const storeSchema = z.object({
  ownerId: z.string(),
  name: z
    .string()
    .min(1)
    .refine((value) => value !== '', 'Must not be empty')
    .refine((value) => value.trim() !== '', 'Must not contain only whitespace'),
  ownerName: z.string(),
  businessName: z.string(),
  businessAddress: z.string(),
  businessTIN: z.string(),
  businessNature: z.string(),
  documentDTIBusinessName: z.string(),
  documentMayorsPermit: z.string(),
  documentBIRPermit: z.string(),
  status: z.string().optional(),
  // Array of IDs
  products: z.string().array().optional(),
  services: z.string().array().optional(),
  productCategories: z.string().array().optional(),
  serviceCategories: z.string().array().optional(),
  cashiers: z.string().array().optional(),
});

export type StoreSchema = BaseSchema & z.infer<typeof storeSchema>;
