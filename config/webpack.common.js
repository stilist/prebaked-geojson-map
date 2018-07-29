const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
  entry: {
    'index': './src/index.ts',
    'index.min': './src/index.ts',
  },

  output: {
    filename: '[name].js',
    library: 'PrebakedGeoJSONMap',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [{
      test: /\.(gif|jpe?g|png)$/,
      loader: 'url-loader',
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }, {
      test: /\.ts$/,
      use: [
        'babel-loader',
      ],
    }],
  },

  devtool: 'source-map',

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
      chunkFilename: '[id].css',
    })
  ],
}

if (process.env.WEBPACK_ANALYZE === 'true') {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
