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

export const UpdateProductSchemaZ = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
  variants: z
    .array(
      z.object({
        id: z.number().optional(),
        sku: z.string().optional(),
        stockCount: z.number().optional(),
        additionalCost: z.number().optional(),
      }),
    )
    .optional(),
});

export const GetProductListSchemaZ = z.object({
  search: z.string().optional(),
});

export type AddProductSchema = z.infer<typeof AddProductSchemaZ>;
export type UpdateProductSchema = z.infer<typeof UpdateProductSchemaZ>;
export type GetProductListSchema = z.infer<typeof GetProductListSchemaZ>;
