import {ApolloError} from 'apollo-errors';

export class ApplicationError extends ApolloError {
  constructor(message = 'An error has occured. Please try again.') {
    super('ApplicationError', {message});
  }
}
