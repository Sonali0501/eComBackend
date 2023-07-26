import { z } from 'zod';

export const ProductSchemaZ = z.object({
  name: z.string(),
  description: z.string().optional(),
  price: z.number(),
});

export const VariantSchemaZ = z.object({
  name: z.string(),
  sku: z.string(),
  stockCount: z.number(),
  additionalCost: z.number(),
});

export const AddProductSchemaZ = ProductSchemaZ.extend({
  variants: z.array(VariantSchemaZ).optional(),
});

export type AddProductSchema = z.infer<typeof AddProductSchemaZ>;
