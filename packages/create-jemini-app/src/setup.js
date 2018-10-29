import {resolve, basename, dirname} from 'path';
import chalk from 'chalk';
import ora from 'ora';
import {validateNodeVersion, parseTemplate, fetchTemplate, installDependencies} from './utils';

export default async (dir, {template = 'default'}) => {
  await validateNodeVersion();
  const path = resolve(process.cwd(), dir);
  const tpl = await parseTemplate(template);
  const spinner = ora(`Fetching ${tpl}...`).start();
  const additional = [];

  await fetchTemplate(tpl, path);
  spinner.succeed(`Fetched ${tpl} at ${dir}.`);

  process.chdir(path);
  try {
    const {cmd} = await installDependencies(spinner);
    spinner.succeed('Installed dependencies.');
    additional.push(chalk.dim(`* ${cmd} start`));
  } catch ({error, cmd, args}) {
    spinner.fail(`Dependency Install Error: ${error}`);
    additional.push(chalk.dim(`* ${[cmd].concat(args).join(' ')}`));
    additional.push(chalk.dim(`* ${cmd} start`));
  } finally {
    process.stdout.write(
      `${chalk.cyan('⇥')} Success! Created ${chalk.green(basename(path))} in ${chalk.dim(dirname(path))}.\n`
    );
    process.stdout.write('We suggest that you begin by typing:\n');
    process.stdout.write(`${chalk.dim(`* cd ${basename(path)}`)}\n`);
    additional.map((message) => {
      process.stdout.write(`${message}\n`);
    });
    process.stdout.write(`${chalk.cyan('Happy developing!')}\n\n`);
  }
};
