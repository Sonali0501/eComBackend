import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import ProductController from '@controllers/product/product.controller';
import authMiddleware from '@middlewares/auth.middleware';
import { asyncResponseWrapper } from '@/helpers';
import { validateRequestBody, validateRequestQueries } from '@middlewares/validation.middleware';
import {
  AddProductSchemaZ,
  DeleteProductSchemaZ,
  GetProductListSchemaZ,
  UpdateProductSchemaZ,
} from '../controllers/product/productSchema';

class ProductRoutes implements Routes {
  public path = '/api/v1/product';
  public router = Router();
  public productController = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(`${this.path}/`)
      .get(
        authMiddleware,
        validateRequestQueries(GetProductListSchemaZ),
        asyncResponseWrapper(this.productController.getProductList),
      )
      .post(
        authMiddleware,
        validateRequestBody(AddProductSchemaZ),
        asyncResponseWrapper(this.productController.addProduct),
      )
      .put(
        authMiddleware,
        validateRequestBody(UpdateProductSchemaZ),
        asyncResponseWrapper(this.productController.updateProduct),
      )
      .delete(
        authMiddleware,
        validateRequestQueries(DeleteProductSchemaZ),
        asyncResponseWrapper(this.productController.deleteProduct),
      );
  }
}
export default ProductRoutes;
