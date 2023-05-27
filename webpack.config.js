const path = require('path');

module.exports = {
  devtool: 'none',
  entry: {
    main: ['@babel/polyfill', './script/index.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          esModule: false
        }
      },
      {
        test: /\.(mp4|webp|jpe?g|png|gif|mp3|svg|ttf|woff2|woff|eot)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name][contentHash].[ext]',
            context: './images/'
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@script': path.resolve(__dirname, '/script'),
      '@style': path.resolve(__dirname, '/style'),
      '@images': path.resolve(__dirname, '/images')
    }
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};