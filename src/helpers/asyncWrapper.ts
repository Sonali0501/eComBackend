import { NextFunction, Request } from 'express';
import { CustomResponse } from '@/interfaces/response.interface';

export const asyncResponseWrapper = (
  callback: (req: Request, res: CustomResponse, next: NextFunction) => Promise<CustomResponse>,
) => {
  return async (req: Request, res: CustomResponse, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      console.log(error.stack);
      return res.failure({ msg: 'Something went wrong!', code: 500 });
    }
  };
};
