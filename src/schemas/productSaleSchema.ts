import { BaseSchema } from 'schemas';
import { z } from 'zod';

export const productSaleSchema = z.object({
  invoiceId: z.string(),
  storeId: z.string(),
  products: z.object({
    productId: z.string(),
    quantity: z.number(),
    unitPrice: z.number(),
  }),
  subtotal: z.number(),
  status: z.enum(['Cancelled', 'Edited', 'Successful']),
  iterationCount: z.number(),
});

export type ProductSaleSchema = BaseSchema & z.infer<typeof productSaleSchema>;
