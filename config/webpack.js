var path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

// Each vendor has a different release schedule, but this list
//   represents approximately one year of releases.
const browserlist = Object.freeze([
  'last 8 Chrome major versions',
  'last 4 Edge major versions',
  'last 8 Firefox major versions',
  'last Safari major version',
])

module.exports = {
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
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [[
            'env',
            {
              browsers: browserlist,
            },
          ]],
        },
      }],
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            autoprefixer: {
              browsers: browserlist,
            },
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
  ],
}
