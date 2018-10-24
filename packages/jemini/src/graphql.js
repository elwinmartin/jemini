import baseResolver from './resolvers';

export class GraphQLSchemaTypeDef {
  constructor({resolve, middleware = [], ...definition}) {
    return {
      ...definition,
      resolve: this.resolver(resolve, middleware),
    };
  }

  resolver(handler, middleware = []) {
    return [...middleware, handler].reduce((ware, next) => ware.createResolver(next), baseResolver);
  }
}
