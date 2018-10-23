import {Model} from '@jemini/bookshelf';

export default Model.extend({
  tableName: 'users',
  uuid: true,
  bcrypt: {field: 'password'},
  softDelete: true,
  hidden: ['password'],
});
