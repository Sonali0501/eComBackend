import { Request } from 'express';
import ProductService from '@services/product.service';
import { CustomResponse } from '@/interfaces/response.interface';
import { ServiceResponse } from '@/interfaces/service.interface';

class ProductController {
  private productService = new ProductService();

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
}

export default ProductController;
