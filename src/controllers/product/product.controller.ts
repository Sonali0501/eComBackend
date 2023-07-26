import { Request } from 'express';
import ProductService from '@services/product.service';
import { CustomResponse } from '@/interfaces/response.interface';
import { ServiceResponse } from '@/interfaces/service.interface';

class ProductController {
  private productService = new ProductService();

  public getProductList = async (req: Request, res: CustomResponse): Promise<CustomResponse> => {
    const search = req.query.search?.toString() || null;
    const resp: ServiceResponse = await this.productService.getProductList(search);
    if (!resp?.ok) return res.invalid({ code: 400, msg: resp.err });
    return res.success({ data: resp.data });
  };

  public addProduct = async (req: Request, res: CustomResponse): Promise<CustomResponse> => {
    const resp: ServiceResponse = await this.productService.addProduct(req.body);
    if (!resp?.ok) return res.invalid({ code: 400, msg: resp.err });
    return res.success({ data: resp.data });
  };

  public updateProduct = async (req: Request, res: CustomResponse): Promise<CustomResponse> => {
    const resp: ServiceResponse = await this.productService.updateProduct(req.body);
    if (!resp?.ok) return res.invalid({ code: 400, msg: resp.err });
    return res.success({ data: resp.data });
  };

  public deleteProduct = async (req: Request, res: CustomResponse): Promise<CustomResponse> => {
    const productId = Number(req.query.id);
    const resp: ServiceResponse = await this.productService.deleteProduct(productId);
    if (!resp?.ok) return res.invalid({ code: 400, msg: resp.err });
    return res.success({ data: resp.data });
  };
}

export default ProductController;
