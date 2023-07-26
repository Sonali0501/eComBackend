export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
    ? Array<DeepPartial<U>>
    : T[P] extends ReadonlyArray<infer U>
    ? ReadonlyArray<DeepPartial<U>>
    : DeepPartial<T[P]>;
};

export interface IConfigApp {
  nodeEnv?: string;
  port?: number;
  databaseUrlSql?: string;
  credentials: boolean;
  origin: string;
  typeorm: Typeorm;
  apiKey?: string;
}

type LoggingOptions = 'error' | 'query';

export interface Typeorm {
  type: string;
  database?: string;
  synchronize: boolean;
  logging: [LoggingOptions];
  entities?: [];
}
