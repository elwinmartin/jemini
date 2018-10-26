import chalk from 'chalk';

export const env = (env, value = undefined) => {
  const key = env.toUpperCase();

  if (!process.env[key]) {
    return value;
  }

  return process.env[key];
};

env.set = (key, value) => {
  process.env[key.toUpperCase()] = value;
};

export const loadDependencies = (pkg, callback, tree = 'dependencies') => {
  Object.keys(pkg[tree]).forEach((dependency) =>
    callback(require(`${dependency}/package`), dependency, pkg[tree][dependency])
  );
};

export const log = (message) => {
  process.stdout.write(`${message}\n`);
};

export const exit = (code = 0) => process.exit(code);

export const action = (promise) => (...args) =>
  promise(...args)
    .then((response) => {
      if (response) {
        log(response);
      }
      exit(0);
    })
    .catch((err) => {
      log(chalk.red(err.stack));
      exit(1);
    });
