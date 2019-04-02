const Remixx = require('../dist/webpack/index').default;
const path = require('path');

module.exports = {
  mode: 'development',
  entry: require.resolve('./source.js'),
  output: {
    chunkFilename: '[name].js',
    publicPath: '/dist/',
    crossOriginLoading: 'anonymous',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: [
          'css-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      remixx: path.resolve(__dirname, '../dist'),
    }
  },
  plugins: [
    new Remixx()
  ]
};
