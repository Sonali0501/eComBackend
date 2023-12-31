import { AddProductSchema, UpdateProductSchema } from '@/controllers/product/productSchema';
import ProductModel from '@/database/repository/product';
import { ServiceResponse } from '@/interfaces/service.interface';

class ProductService {
  private productModel = new ProductModel();

  public async getProductList(search?: string): Promise<ServiceResponse> {
    const data = await this.productModel.getProductList(search);
    return {
      ok: true,
      data: data,
    };
  }

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

  public async updateProduct(product: UpdateProductSchema): Promise<ServiceResponse> {
    const variants = product.variants;
    delete product.variants;
    const productId = product.id;
    delete product.id;

    const exisitingProduct = await this.productModel.getProductAndVariantIds(productId);
    if (!exisitingProduct)
      return {
        ok: false,
        err: `Product with id: ${productId} does not exist`,
      };

    const existingVariantIds = exisitingProduct.variants.map(i => i.id);
    for (let variant of variants) {
      if (variant.id && !existingVariantIds.includes(variant.id)) {
        return {
          ok: false,
          err: `Variant with id: ${variant.id} and productId: ${productId} does not exist`,
        };
      }
    }

    const updatedProduct = await this.productModel.updateProduct(productId, product, variants);
    if (!updatedProduct)
      return {
        ok: false,
        err: 'Failed to update product',
      };

    return {
      ok: true,
      data: {
        message: 'successfully updated product',
      },
    };
  }

  public async deleteProduct(productId: number): Promise<ServiceResponse> {
    const deleteResp = await this.productModel.deleteProduct(productId);
    if (!deleteResp)
      return {
        ok: false,
        err: 'Failed to delete product',
      };

    return {
      ok: true,
      data: {
        message: 'successfully deleted product',
      },
    };
  }
}

export default ProductService;
