import { ParsedQs } from 'qs';
import { RequestHandler, Request, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { z } from 'zod';
import { function as F, either as E } from 'fp-ts';
import { parseZ, parseZodError } from '@utils/zod.utils';
import { RequestContentLocation } from '@interfaces/zod.interface';
import { CustomResponse } from '@interfaces/response.interface';

export const validateRequest =
  <T>({
    requestContentLocation,
    zodType,
  }: {
    requestContentLocation: RequestContentLocation;
    zodType: z.ZodType<T>;
  }): RequestHandler =>
  (req: Request, res: CustomResponse, next: NextFunction) => {
    const requestContentParser = parseZ(zodType);
    const requestContent = req[requestContentLocation];

    return F.pipe(
      requestContentParser(requestContent),
      E.fold(
        err => {
          console.error('Validation error: ' + err.toString());
          return res.invalid({ msg: parseZodError(err) });
        },
        () => next(),
      ),
    );
  };

export const validateRequestBody = <T>(zodType: z.ZodType<T>): RequestHandler<any, any, T, any, any> =>
  validateRequest({ requestContentLocation: 'body', zodType });

export const validateRequestQueries = <T extends ParsedQs>(
  zodType: z.ZodType<T>,
): RequestHandler<any, any, any, T, any> => validateRequest({ requestContentLocation: 'query', zodType });

export const validateRequestParams = <T extends ParamsDictionary>(
  zodType: z.ZodType<T>,
): RequestHandler<T, any, any, any, any> => validateRequest({ requestContentLocation: 'params', zodType });
