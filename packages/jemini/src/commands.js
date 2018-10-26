import {loadDependencies} from './utils';

export default function(pkgJson) {
  this.program
    .command('start')
    .description('Start the server.')
    .action(async () => {
      const app = require('./application');

      loadDependencies(pkgJson, (pkg, dependency) => {
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
}
