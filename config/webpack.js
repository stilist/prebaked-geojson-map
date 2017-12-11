const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ZopfliPlugin = require('zopfli-webpack-plugin')

const config = {
  entry: {
    'index': './src/index.ts',
    'index.min': './src/index.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '..', 'dist'),
    pathinfo: true,
    publicPath: '/dist/',
    library: 'PrebakedGeoJSONMap',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [
      path.resolve(__dirname, '..', 'src'),
      path.resolve(__dirname, '..', 'node_modules'),
    ],
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: [{
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'config/tsconfig.json',
        },
      }],
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true,
          },
        }],
      }),
    }, {
      test: /\.(gif|jpe?g|png)$/,
      loader: 'url-loader',
    }],
  },

  devtool: 'source-map',
  plugins: [
    new ExtractTextPlugin('index.css'),
    new UglifyJSPlugin({
      include: /\.min\.js$/,
      sourceMap: true,
    }),
    new ZopfliPlugin({
        asset: '[path].gz[query]',
        algorithm: 'zopfli',
        test: /\.(css|js|map)$/,
        threshold: 10240,
        minRatio: 0.8
    }),
  ],
}

if (process.env.WEBPACK_ANALYZE === 'true') {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
