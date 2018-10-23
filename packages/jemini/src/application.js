import express from 'express';
import bodyParser from 'body-parser';
import cookies from 'cookie-parser';
import morgan from 'morgan';
import compress from 'compression';
import helmet from 'helmet';
import {ApolloServer} from 'apollo-server-express';
import {formatError} from 'apollo-errors';
import schema from '@app/schema';
import {env} from './utils';

export default class Application {
  express = express();
  host = env('APP_HOST', '0.0.0.0');
  port = env('PORT', 9000);

  constructor() {
    this.express.set('x-powered-by', false);
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({extended: false}));
    this.express.use(cookies());
    this.express.use(compress());
    this.express.use(helmet());
    this.express.use(morgan(env('NODE_ENV') === 'production' ? 'combined' : 'dev'));
    new ApolloServer({
      schema,
      formatError,
      context: ({req, res}) => ({req, res}),
    }).applyMiddleware({app: this.express, path: env('GRAPHQL_PATH', '/graphql')});
  }

  use(...args) {
    return this.express.use(...args);
  }

  get(...args) {
    return this.express.get(...args);
  }

  post(...args) {
    return this.express.post(...args);
  }

  put(...args) {
    return this.express.put(...args);
  }

  patch(...args) {
    return this.express.patch(...args);
  }

  delete(...args) {
    return this.express.delete(...args);
  }

  head(...args) {
    return this.express.head(...args);
  }

  options(...args) {
    return this.express.options(...args);
  }

  async start() {
    return this.express.listen(this.port, this.host, () => {
      console.log(`Your app is available at http://${this.host}:${this.port}`);
    });
  }
}
