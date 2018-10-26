import {Router} from 'express';
import {GraphQLSchemaTypeDef} from './graphql';
import ApolloError, {ApplicationError} from './errors';
import app from './application';

export default app;

export {Router, GraphQLSchemaTypeDef, ApolloError, ApplicationError};
