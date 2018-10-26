import webpack from 'webpack';
import Promise from 'bluebird';

export default function() {
  this.program
    .command('webpack:build')
    .description('Compile assets with webpack.')
    .action(
      this.action(async () => {
        try {
          const config = require('@app/webpack.config');
          const compiler = webpack(config);

          return new Promise((resolve, reject) => {
            compiler.run((err, stats) => {
              if (err) {
                return reject(err);
              }

              const info = stats.toJson();

              if (stats.hasErrors()) {
                return reject(info.errors);
              }

              return resolve(stats.toString());
            });
          });
        } catch (err) {
          throw new Error('No webpack.config.js file found.');
        }
      })
    );
}
