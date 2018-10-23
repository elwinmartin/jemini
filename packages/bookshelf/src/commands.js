import {resolve, relative} from 'path';
import {singularize, capitalize} from 'inflection';
import {getTableName} from './utils';
import {db} from './bookshelf';

export default function() {
  this.program
    .command('make:migration <name>')
    .description('Create a named migration file.')
    .option('-t, --tableName <tableName>', 'Table name for migration.')
    .action(
      this.action(async (name, {tableName: table}) => {
        const tableName = table ? table : getTableName(name);
        await db.knex.migrate.make(name, {
          stub: resolve(__dirname, '../stubs/migration.stub'),
          variables: {tableName},
        });

        return `${this.chalk.green('Created Migration:')} ${name}`;
      })
    );

  this.program
    .command('db:migrate')
    .description('Run all migrations that have not yet been run.')
    .action(
      this.action(async () => {
        const [batch, migrations] = await db.knex.migrate.latest();

        if (migrations.length === 0) {
          return this.chalk.cyan('Already up to date');
        }

        return `${this.chalk.green(`Batch ${batch} ran ${migrations.length} migrations:`)}\n${this.chalk.cyan(
          migrations
            .map((m) => relative(db.knex.client.config.migrations.directory, m.replace(/(.*)\.js$/, '$1')))
            .join('\n')
        )}`;
      })
    );

  this.program
    .command('make:seed <name>')
    .description('Create a named seed file.')
    .action(
      this.action(async (name) => {
        const file = singularize(name);
        const model = capitalize(file);
        await db.knex.seed.make(name, {
          stub: resolve(__dirname, '../stubs/seed.stub'),
          variables: {file, model, tableName: name},
        });

        return `${this.chalk.green('Created Seed:')} ${name}`;
      })
    );

  this.program
    .command('db:seed')
    .description('Run seed files.')
    .action(
      this.action(async () => {
        const [seeds] = await db.knex.seed.run();

        if (seeds.length === 0) {
          return this.chalk.cyan('No seed files exist');
        }

        return `${this.chalk.green(`Ran ${seeds.length} seed files:`)}\n${this.chalk.cyan(
          seeds.map((s) => relative(db.knex.client.config.seeds.directory, s.replace(/(.*)\.js$/, '$1'))).join('\n')
        )}`;
      })
    );
}
