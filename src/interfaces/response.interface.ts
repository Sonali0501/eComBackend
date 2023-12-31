import { Response } from 'express';

export interface CustomResponse extends Response {
  sendEncryptedData: any;
  invalid: any;
  failure: any;
  unauthorized: any;
  success: any;
  resBody: any;
}
