import { NextFunction, Request } from 'express';
import { CustomResponse } from '@/interfaces/response.interface';

export default (req: Request, res: CustomResponse, next: NextFunction) => {
  res.invalid = ({ msg, code = 400 }) => {
    const responseData = { ok: false, err: msg || 'Invalid Parameters', code, data: null };
    res.resBody = responseData;
    return res.status(code).json(responseData);
  };

  res.failure = ({ msg, code = 500 }) => {
    const responseData = {
      ok: false,
      err: msg || "Something is wrong! We're looking into it.",
      code,
      data: null,
    };

    res.resBody = responseData;
    return res.status(code).json(responseData);
  };

  res.unauthorized = ({ msg }) => {
    const responseData = { ok: false, err: msg || 'Authentication Failed', data: null };
    res.resBody = responseData;

    return res.status(401).json(responseData);
  };

  res.success = ({ data = {} }) => {
    const responseData = { ok: true, err: null, data };
    res.resBody = responseData;

    return res.status(200).json(responseData);
  };

  next();
};
