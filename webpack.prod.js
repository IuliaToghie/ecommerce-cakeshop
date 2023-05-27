const config = require('./webpack.config');
const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
// const { extendDefaultPlugins } = require('svgo');

module.exports = merge(config, {
  devtool: 'source-map',
  mode: 'production',
  output: {
    // Output folder
    path: path.resolve(__dirname, 'build'),
    filename: 'script/index.[contenthash].js',
    publicPath: './'
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/style.[contenthash].css'
    })
    // For moment i am using a web tool to compress my images, because my laptop runs slowly and takes to much to build
    // new ImageMinimizerPlugin({
    //   minimizerOptions: {
    //     plugins: [
    //       ["gifsicle", { interlaced: true }],
    //       ["jpegtran", { progressive: true }],
    //       ["optipng", { optimizationLevel: 5 }],
    //       [
    //         "svgo",
    //         {
    //           plugins: extendDefaultPlugins([
    //             {
    //               name: "removeViewBox",
    //               active: false,
    //             },
    //             {
    //               name: "addAttributesToSVGElement",
    //               params: {
    //                 attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
    //               },
    //             },
    //           ]),
    //         },
    //       ],
    //     ],
    //   },
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' }
          },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
});