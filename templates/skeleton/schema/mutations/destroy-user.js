import {GraphQLSchemaTypeDef} from 'jemini';
import {GraphQLBoolean, GraphQLID, GraphQLNonNull} from 'graphql';
import User from '@app/models/user';

export default new GraphQLSchemaTypeDef({
  type: GraphQLBoolean,
  args: {
    id: {type: new GraphQLNonNull(GraphQLID)},
  },
  async resolve(_, {id}) {
    const user = await User.findById(id);
    await user.destroy();

    return true;
  },
});
