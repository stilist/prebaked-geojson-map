const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CompressionPlugin = require('compression-webpack-plugin')
const DtsBundle = require('dts-bundle-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge.smart(common, {
  mode: 'production',

  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    }, {
      test: /\.ts$/,
      use: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            configFile: 'config/tsconfig.production.json',
          },
        },
      ],
    }],
  },

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        include: /\.min\.js$/,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

  plugins: [
    new CompressionPlugin({
      threshold: 10240,
    }),
    new DtsBundle({
      main: 'dist/index.d.ts',
      name: 'prebaked-geojson-map',
      referenceExternals: true,
      removeSource: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'index.css',
      chunkFilename: '[id].css',
    }),
  ],
})
