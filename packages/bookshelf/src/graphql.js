import Promise from 'bluebird';
import {snakeCase} from 'lodash';
import {GraphQLObjectType} from 'graphql';

class GraphQLBookshelfType {
  constructor({fields, ...options}) {
    return new GraphQLObjectType({
      ...options,
      fields: () => fields(this),
    });
  }

  attr(options) {
    return {
      ...options,
      resolve(model, params, context, {fieldName}) {
        return model.get(snakeCase(fieldName));
      },
    };
  }

  belongsTo(options) {
    return {
      ...options,
      resolve(model, params, context, {fieldName}) {
        return model.related(snakeCase(fieldName)).fetch();
      },
    };
  }

  hasMany({resolve: resolver = () => {}, ...options}) {
    return {
      ...options,
      resolve(model, params, context, {fieldName}) {
        const relation = snakeCase(fieldName);
        return model
          .clone()
          .load({[relation]: resolver})
          .then((model) => {
            const related = model.related(relation);

            return Promise.resolve(related).then((c) => c.models);
          });
      },
    };
  }
}

export default GraphQLBookshelfType;
