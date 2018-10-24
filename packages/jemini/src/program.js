#!/usr/bin/env node
import {sync as find} from 'find-up';
import chalk from 'chalk';

const pkg = require(find('package.json'));

if (Object.keys(pkg.dependencies || {}).indexOf('jemini') > -1) {
  require('./jemini');
} else {
  process.stderr.write(`${chalk.red(`No Jemini application found in ${process.cwd()}`)}\n\n`);
  process.stderr.write(`You can use ${chalk.cyan('create-jemini-app')} to create an application.\n\n`);
  process.stderr.write(`Using npm:\n  ${chalk.green('npm init jemini-app my-app')}\n\n`);
  process.stderr.write(`Using yarn:\n  ${chalk.green('yarn create jemini-app my-app')}\n`);
  process.exit(1);
}
