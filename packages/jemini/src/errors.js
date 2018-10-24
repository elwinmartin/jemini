import {ApolloError} from 'apollo-errors';

export default ApolloError;

export class ApplicationError extends ApolloError {
  constructor(message = 'An error has occured. Please try again.') {
    super('ApplicationError', {message});
  }
}
