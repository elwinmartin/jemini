import {env} from 'jemini/lib/utils';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default function() {
  try {
    const config = require('@app/webpack.config');
    const compiler = webpack(config);

    if (env('NODE_ENV', 'development') !== 'development') {
      throw new Error('not in development mode');
    }

    this.app.use(
      webpackDevMiddleware(compiler, {
        compress: true,
        publicPath: config.output.publicPath,
        index: false,
      })
    );

    this.app.use(webpackHotMiddleware(compiler));
  } catch (err) {}
}
