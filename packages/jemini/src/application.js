import express from 'express';
import bodyParser from 'body-parser';
import cookies from 'cookie-parser';
import morgan from 'morgan';
import compress from 'compression';
import helmet from 'helmet';
import {ApolloServer} from 'apollo-server-express';
import {formatError} from 'apollo-errors';
import schema from '@app/schema';
import context, {contextMiddleware} from './context';
import {env, log} from './utils';

class Application {
  host = env('APP_HOST', '0.0.0.0');
  port = env('PORT', 9000);
  path = env('GRAPHQL_PATH', '/graphql');
  express = express();
  apollo = new ApolloServer({schema, formatError, context});

  constructor() {
    this.express.set('x-powered-by', false);
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.use(cookies());
    this.express.use(compress());
    this.express.use(helmet());
    this.express.use(morgan(env.is('NODE_ENV', 'production') ? 'combined' : 'dev'));
    this.express.use(contextMiddleware());
  }

  use(...args) {
    return this.express.use(...args);
  }

  async start() {
    this.apollo.applyMiddleware({app: this.express, path: this.path});

    return this.express.listen(this.port, this.host, () => {
      log(`Your app is available at http://${this.host}:${this.port}`);
    });
  }
}

export default new Application();
