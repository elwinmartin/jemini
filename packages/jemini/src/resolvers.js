import {createResolver} from 'apollo-resolvers';
import {isInstance as isApolloError} from 'apollo-errors';
import {ApplicationError} from './errors';

export default createResolver(null, (parent, args, context, error) => {
  if (!isApolloError(error) && !error.safe) {
    return new ApplicationError();
  }

  return error;
});
