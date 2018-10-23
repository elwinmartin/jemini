import {factory} from '@jemini/bookshelf';
import User from '@app/models/user';

export const seed = async (db) => {
  await db.truncate('users');

  return factory(User, (faker) => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  })).create(10);
};
