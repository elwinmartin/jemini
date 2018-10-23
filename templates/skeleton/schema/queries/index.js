import {GraphQLObjectType} from 'graphql';
import users from '@app/schema/queries/users';

export default new GraphQLObjectType({
  name: 'Queries',
  fields: () => ({
    users,
  }),
});
