import { DeepPartial } from 'typeorm';
import { AppDataSource } from '@utils/typeorm';
import { Product } from '@database/entity/product';
import { Variant } from '@database/entity/variant';

export default class ProductModel {
  public async addProduct(product: DeepPartial<Product>, variants?: DeepPartial<Variant>[]) {
    try {
      const resp = await AppDataSource.transaction(async transManager => {
        const savedProduct = await transManager.getRepository(Product).save(product);

        if (variants?.length) {
          const variantRepo = transManager.getRepository(Variant);
          variants.forEach(variant => {
            variant.productId = savedProduct.id;
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
}
