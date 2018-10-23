import {GraphQLSchemaTypeDef} from 'jemini';
import {GraphQLID, GraphQLString, GraphQLNonNull} from 'graphql';
import UserType from '@app/schema/types/user';
import User from '@app/models/user';

export default new GraphQLSchemaTypeDef({
  type: UserType,
  args: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    email: {type: new GraphQLNonNull(GraphQLString)},
    password: {type: GraphQLString},
  },
  async resolve(_, {id, ...attributes}) {
    const user = await User.findById(id);

    await user.save(attributes);

    return user;
  },
});
