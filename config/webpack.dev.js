const merge = require('webpack-merge')
const common = require('./webpack.common.js')

const config = merge.smart(common, {
  mode: 'development',

  output: {
    pathinfo: true,
  },

  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }, {
      test: /\.ts$/,
      use: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            configFile: 'config/tsconfig.json',
          },
        },
      ],
    }],
  },
})
