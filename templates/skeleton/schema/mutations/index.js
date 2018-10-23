import {GraphQLObjectType} from 'graphql';
import createUser from '@app/schema/mutations/create-user';
import updateUser from '@app/schema/mutations/update-user';
import destroyUser from '@app/schema/mutations/destroy-user';

export default new GraphQLObjectType({
  name: 'Mutations',
  fields: () => ({
    createUser,
    updateUser,
    destroyUser,
  }),
});
