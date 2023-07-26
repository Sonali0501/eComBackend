import { AddProductSchema } from '@/controllers/product/productSchema';
import ProductModel from '@/database/repository/product';
import { ServiceResponse } from '@/interfaces/service.interface';

class ProductService {
  private productModel = new ProductModel();

  public async addProduct(product: AddProductSchema): Promise<ServiceResponse> {
    const variants = product.variants;
    delete product.variants;

    const insertedProduct = await this.productModel.addProduct(product, variants);
    if (!insertedProduct)
      return {
        ok: false,
        err: 'Failed to add new product',
      };

    return {
      ok: true,
      data: {
        message: 'successfully added product',
        product: insertedProduct,
      },
    };
  }
}

export default ProductService;
