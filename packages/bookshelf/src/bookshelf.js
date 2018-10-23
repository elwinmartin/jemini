import {resolve} from 'path';
import knex from 'knex';
import bookshelf from 'bookshelf';
import {pluggable as modelBase} from 'bookshelf-modelbase';
import bcrypt from 'bookshelf-bcrypt';
import scopes from 'bookshelf-scopes';
import uuid from 'bookshelf-uuid';
import paranoia from 'bookshelf-paranoia';
import {env} from 'jemini/lib/utils';

const db = bookshelf(
  knex({
    client: env('DATABASE_CLIENT', 'pg'),
    connection: env('DATABASE_URL', {
      host: env('DATABASE_HOST'),
      user: env('DATABASE_USER'),
      password: env('DATABASE_PASSWORD'),
      database: env('DATABASE_NAME'),
    }),
    useNullAsDefault: true,
    migrations: {
      directory: resolve(env('APP_PATH'), 'database/migrations'),
      tableName: 'migrations',
    },
    seeds: {
      directory: resolve(env('APP_PATH'), 'database/seeds'),
    },
  })
);

db.plugin('visibility');
db.plugin(modelBase);
db.plugin(bcrypt);
db.plugin(scopes);
db.plugin(uuid);
db.plugin(paranoia);

const Model = db.Model;

export {db, Model};
