import { NextFunction, Response, Request } from 'express';
import { config } from '@utils/config.utils';
import { HttpException } from '@exceptions/HttpException';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key');
  if (apiKey?.toString() === config.apiKey.toString()) {
    next();
  } else {
    next(new HttpException(404, 'missing / invalid api-key'));
  }
};

export default authMiddleware;
