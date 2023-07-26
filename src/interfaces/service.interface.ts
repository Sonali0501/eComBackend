export interface ServiceResponse<T = unknown> {
  ok: boolean;
  err?: string;
  data?: T;
}
