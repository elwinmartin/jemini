export const env = (env, value = undefined) => {
  const key = env.toUpperCase();

  if (!process.env[key]) {
    return value;
  }

  return process.env[key];
};

export const loadDependencies = (pkg, callback, tree = 'dependencies') => {
  Object.keys(pkg[tree]).forEach((dependency) =>
    callback(require(`${dependency}/package`), dependency, pkg[tree][dependency])
  );
};
