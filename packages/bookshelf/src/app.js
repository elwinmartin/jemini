import {knex} from './';

export default function() {
  this.app.use((req, res, next) => {
    req.db = knex;

    return next();
  });
}
