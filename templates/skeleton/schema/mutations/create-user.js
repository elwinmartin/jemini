import {GraphQLSchemaTypeDef} from 'jemini';
import {GraphQLString, GraphQLNonNull} from 'graphql';
import UserType from '@app/schema/types/user';
import User from '@app/models/user';

export default new GraphQLSchemaTypeDef({
  type: UserType,
  args: {
    name: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: new GraphQLNonNull(GraphQLString)},
  },
  async resolve(_, {name, email, password}) {
    const user = await User.create({name, email, password});

    return user;
  },
});
