import { DeepPartial } from 'typeorm';
import { format } from 'date-fns';
import { AppDataSource } from '@utils/typeorm';
import { Product } from '@database/entity/product';
import { Variant } from '@database/entity/variant';

export default class ProductModel {
  public async getProductList(search?: string) {
    try {
      const query = AppDataSource.getRepository(Product)
        .createQueryBuilder('products')
        .leftJoinAndSelect('products.variants', 'variants');

      if (search?.length) {
        query.where('products.name LIKE :search OR products.description LIKE :search OR variants.name LIKE :search', {
          search: `%${search}%`,
        });
      }
      const data = await query.getMany();
      return data;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async addProduct(product: DeepPartial<Product>, variants?: DeepPartial<Variant>[]) {
    try {
      const resp = await AppDataSource.transaction(async transManager => {
        const savedProduct = await transManager
          .getRepository(Product)
          .save({ ...product, createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss') });

        if (variants?.length) {
          const variantRepo = transManager.getRepository(Variant);
          variants.forEach(variant => {
            variant.productId = savedProduct.id;
            variant.createdAt = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
          });
          const variantEntities = variantRepo.create(variants);
          const savedVariants = await variantRepo.save(variantEntities);
          savedProduct.variants = savedVariants;
        }

        return savedProduct;
      });
      return resp;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async updateProduct(
    productId: number,
    productUpdateData?: DeepPartial<Product>,
    variantsUpdateData?: DeepPartial<Variant>[],
  ) {
    try {
      const resp = await AppDataSource.transaction(async transManager => {
        const updatedProduct = await transManager
          .getRepository(Product)
          .createQueryBuilder('products')
          .update('products')
          .set({ ...productUpdateData, updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss') })
          .where({ id: productId })
          .execute();

        if (variantsUpdateData?.length) {
          const variantRepo = transManager.getRepository(Variant);
          const newVariants = [];
          for (let variant of variantsUpdateData) {
            const variantId = variant.id;
            if (variantId) {
              delete variant.id;
              delete variant.productId;
              await variantRepo
                .createQueryBuilder('variants')
                .update('variants')
                .set({ ...variant, updatedAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss') })
                .where({ id: variantId })
                .andWhere({ productId: productId })
                .execute();
            } else {
              newVariants.push({ ...variant, productId, createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss') });
            }
          }

          const variantEntities = variantRepo.create(newVariants);
          await variantRepo.save(variantEntities);
        }

        return updatedProduct;
      });
      return resp;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async getProductAndVariantIds(productId: number) {
    try {
      const data = await AppDataSource.getRepository(Product)
        .createQueryBuilder('products')
        .where({ id: productId })
        .leftJoin('products.variants', 'variants')
        .select(['products'])
        .addSelect(['variants.id'])
        .getOne();
      return data;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  public async deleteProduct(productId: number) {
    try {
      const resp = await AppDataSource.getRepository(Product).delete({ id: productId });
      return resp;
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
