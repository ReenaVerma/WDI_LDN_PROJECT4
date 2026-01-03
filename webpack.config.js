const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpack = new HtmlWebpackPlugin({
  template: 'src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyWebpack = new CopyWebpackPlugin({
  patterns: [
    { from: './src/assets', to: 'assets' }
  ]
});

const HotModuleReplcement = new webpack.HotModuleReplacementPlugin();

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    // path: path.resolve('build'),
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', { loader: 'sass-loader', options: { api: 'modern', sassOptions: { quietDeps: true}}}] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, use: 'file-loader' },
      { test: /\.(woff|woff2)$/, use: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml' },
      { test: /\.jpe?g(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/jpeg' },
      { test: /\.gif(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/gif' },
      { test: /\.png(\?v=\d+\.\d+\.\d+)?$/, use: 'url-loader?limit=10000&mimetype=image/png' }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src')
    },
    historyApiFallback: true,
    hot: true,
    port: 8000,
    open: true,
    client: {
      overlay: false
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000', 
        secure: false
      }
    }
  },
  plugins: [HotModuleReplcement, HtmlWebpack, CopyWebpack]
};
