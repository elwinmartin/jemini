export default {
  configFile: false,
  babelrc: false,
  babelrcRoots: false,
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    ['@babel/proposal-object-rest-spread', {useBuiltIns: true}],
    ['@babel/proposal-class-properties'],
    'add-module-exports',
  ],
};
