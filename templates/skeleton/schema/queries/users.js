import {GraphQLSchemaTypeDef} from 'jemini';
import {GraphQLList} from 'graphql';
import UserType from '@app/schema/types/user';
import User from '@app/models/user';

export default new GraphQLSchemaTypeDef({
  type: new GraphQLList(UserType),
  async resolve() {
    return User.findAll();
  },
});
