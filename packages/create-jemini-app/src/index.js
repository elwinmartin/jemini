#!/usr/bin/env node
import {Command} from 'commander';
import chalk from 'chalk';
import {version} from '../package';
import setup from './setup';

const program = new Command('jemini-app')
  .version(version, '-v, --version')
  .option('-t, --template <repo>', 'github repo to scaffold from')
  .option('-N, --next', 'use unstable version')
  .arguments('<directory>')
  .usage(`${chalk.green('<directory>')} [options]`)
  .action((...args) =>
    setup(...args)
      .then((response) => {
        if (response) {
          process.stdout.write(`${response}\n`);
        }
        process.exit(0);
      })
      .catch((err) => {
        process.stderr.write(`${chalk.red(err.message)}\n`);
        process.exit(1);
      })
  )
  .parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
}
