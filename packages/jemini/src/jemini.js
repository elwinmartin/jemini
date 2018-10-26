import {Command} from 'commander';
import chalk from 'chalk';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';
import {resolve} from 'app-root-path';
import babel from '@babel/register';
import babelConfig from './babel';
import {env, loadDependencies, action, log, exit} from './utils';
import {name, version} from '../package.json';
import commands from './commands';

dotenv.config();
env.set('APP_PATH', resolve(env('__SECRET_PATH_DO_NOT_USE_OR_YOU_WILL_BE_FIRED', '.')));
moduleAlias.addAlias('@app', env('APP_PATH'));
babel(babelConfig);

const pkgJson = require('@app/package');
const program = new Command(chalk.green(name)).version(version, '-v, --version').usage('[command] [options]');
const context = {
  program,
  action,
  chalk,
  log,
  exit,
};

loadDependencies(pkgJson, (pkg, dependency) => {
  if (pkg.config && pkg.config.jemini && pkg.config.jemini.program) {
    require(`${dependency}/${pkg.config.jemini.program}`).call(context);
  }
});

commands.call(context, pkgJson);

program.commands = program.commands.sort((a, b) => {
  return a._name.localeCompare(b._name);
});

program.parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
}
