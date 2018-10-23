import {GraphQLID, GraphQLString} from 'graphql';
import {GraphQLBookshelfType} from '@jemini/bookshelf';

export default new GraphQLBookshelfType({
  name: 'User',
  fields: (model) => ({
    id: model.attr({
      type: GraphQLID,
    }),
    name: model.attr({
      type: GraphQLString,
    }),
    email: model.attr({
      type: GraphQLString,
    }),
  }),
});
