import {Command} from 'commander';
import chalk from 'chalk';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';
import {resolve} from 'app-root-path';
import babel from '@babel/register';
import babelConfig from './babel';
import {loadDependencies} from './utils';
import {env} from './utils';
import {name, version} from '../package.json';

dotenv.config();
process.env.APP_PATH = resolve(env('JEMINI_DEV', '.'));
moduleAlias.addAlias('@app', env('APP_PATH'));
babel(babelConfig);

const packageJson = require('@app/package');
const program = new Command(chalk.green(name)).version(version, '-v, --version').usage('[command] [options]');

const action = (promise) => (...args) =>
  promise(...args)
    .then((response) => {
      process.stdout.write(`${response}\n`);
      process.exit(0);
    })
    .catch((err) => {
      process.stderr.write(`${chalk.red(err.stack)}\n`);
      process.exit(1);
    });

loadDependencies(packageJson, (pkg, dependency) => {
  if (pkg.config && pkg.config.jemini && pkg.config.jemini.program) {
    require(`${dependency}/${pkg.config.jemini.program}`).call({
      program,
      action,
      chalk,
    });
  }
});

program
  .command('start')
  .description('Start the server.')
  .action(async () => {
    const {default: app} = require('./');

    loadDependencies(packageJson, (pkg, dependency) => {
      if (pkg.config && pkg.config.jemini && pkg.config.jemini.app) {
        require(`${dependency}/${pkg.config.jemini.app}`).call({app});
      }
    });

    try {
      require('@app/jemini');
    } catch (err) {
      // not found, ignore it
    }

    await app.start();
  });

program.commands = program.commands.sort((a, b) => {
  return a._name.localeCompare(b._name);
});

program.parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
}
