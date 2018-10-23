import {createResolver} from 'apollo-resolvers';
import {isInstance as isApolloError} from 'apollo-errors';
import {ApplicationError} from './errors';

export default class GraphQLSchemaTypeDef {
  constructor({resolve, middleware = [], ...definition}) {
    return {
      ...definition,
      resolve: this.resolver(resolve, middleware),
    };
  }

  resolver(resolve) {
    return createResolver(null, (parent, args, context, error) => {
      if (!isApolloError(error) && !error.safe) {
        return new ApplicationError();
      }

      return error;
    }).createResolver(resolve);
  }
}
