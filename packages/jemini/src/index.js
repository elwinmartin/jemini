import {Router} from 'express';
import {GraphQLSchemaTypeDef} from './graphql';
import Application from './application';
import ApolloError, {ApplicationError} from './errors';

export default new Application();

export {Router, GraphQLSchemaTypeDef, ApolloError, ApplicationError};
