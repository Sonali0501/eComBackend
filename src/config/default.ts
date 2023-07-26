import { IConfigApp } from './constraint';

const config: IConfigApp = {
  port: 4000,
  origin: '*',
  credentials: true,
  typeorm: {
    type: 'mysql',
    synchronize: true,
    logging: ['error'],
  },
};

export default config;
