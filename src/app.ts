import compression from 'compression';
import cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';

import { Routes } from '@interfaces/routes.interface';
import { config } from '@utils/config.utils';
import { AppDataSource } from '@utils/typeorm';
import responseHandlers from '@middlewares/response.middleware';
import errorMiddleware from '@middlewares/error.middleware';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = config.nodeEnv;
    this.port = config.port;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private connectToDatabase() {
    AppDataSource.initialize()
      .then(() => console.log('Mysql connected via Typeorm'))
      .catch(error => console.log(error.stack));
  }

  private initializeMiddlewares() {
    this.app.use(cors({ origin: config.origin, credentials: config.credentials }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());

    // Custom Response Handlers
    this.app.use(responseHandlers);
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
