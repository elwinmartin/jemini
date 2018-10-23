import Promise from 'bluebird';
import faker from 'faker';

export default (Model, callback) => ({
  async create(length = 1) {
    return Promise.all(Array.from({length}, () => Model.create(callback(faker))));
  },
});
