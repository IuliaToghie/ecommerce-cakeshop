const config = require('./webpack.config');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(config, {
  devtool: 'eval',
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: 'body'
    }),
    new HtmlWebpackPlugin({
      filename: 'login.html',
      template: './login.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'register.html',
      template: './register.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'allProducts.html',
      template: './allProducts.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'productDetails.html',
      template: './productDetails.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'spacialBox.html',
      template: './spacialBox.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'cart.html',
      template: './cart.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'billingDetails.html',
      template: './billingDetails.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'contact.html',
      template: './contact.html'
    })
  ],
  module: {
    rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            {
                loader: "css-loader",
                options: {
                  url: true,
                },
            },
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
      ],
  }
});