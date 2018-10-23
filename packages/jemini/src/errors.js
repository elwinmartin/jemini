import {ApolloError} from 'apollo-errors';

export class UnknownError extends ApolloError {
  constructor(message = 'An unknown error has occurred! Please try later.') {
    super('UnknownError', {message});
  }
}
