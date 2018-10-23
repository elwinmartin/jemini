#!/usr/bin/env node
import chalk from 'chalk';

const [major] = process.versions.node.split('.');

if (major < 8) {
  process.stderr.write(
    chalk.red(
      `You are running Node ${
        process.versions.node
      }.\nCreate Jemini App requires Node 8 or higher.\nPlease update your version of node.\n`
    )
  );
  process.exit(1);
}

process.stdout.write(chalk.yellow(`Create Jemini App is not implemented yet.\n`));
