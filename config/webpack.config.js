const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackBar = require('webpackbar');

const env = process.env.DEPLOY_ENV;
const port = '8080';
// const isProd = env === 'prod';
const isProd = false;
const mode = isProd ? 'production' : 'development';
const target = 'web';
const devtool = 'eval-source-map';
const entry = './src/main.js';
const resolve = {
  extensions: ['.js', '.json', '.css'],
  alias: {
    components: path.resolve(__dirname, '../src/components'),
    pages: path.resolve(__dirname, '../src/pages'),
    utils: path.resolve(__dirname, '../src/utils'),
    images: path.resolve(__dirname, '../src/images'),
    '@': path.resolve(__dirname, '../src')
  }
};
const proxy = {
  '/api': {
    target: 'http://http://127.0.0.1:9898/api',
    pathRewrite: {'^/uc': ''}
  }
};

const modules = {
  rules: [{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader?cacheDirectory=true'
  }, {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  }, {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader'
    ]
  }, {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader'
    ]
  }, {
    test: /.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]?[hash]'
    }
  }]
};

const plugins = [
  new MiniCssExtractPlugin({
    filename: !isProd ? '[name].css' : '[name].[hash].css',
    chunkFilename: !isProd ? '[id].css' : '[id].[hash].css'
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../index.html')
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: `${JSON.stringify(env)}`
    }
  }),
  new WebpackBar({
    done: () => {
      console.log('\n');
      console.log(`server is running on http://127.0.0.1:${port}/`.yellow);
    }
  }),
  new CopyWebpackPlugin([
    {
      from: path.resolve(__dirname, '../static'),
      to: 'static',
      ignore: ['.*']
    }
  ]),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery'
  })
];

const optimization = {
  splitChunks: {
    cacheGroups: {
      main: {
        test: /[\\/]src[\\/]/,
        chunks: 'initial',
        name: 'main',
        enforce: true
      }
    }
  },
  runtimeChunk: {
    name: entrypoint => `runtimechunk~${entrypoint.name}`
  },
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true
    }),
    new OptimizeCSSAssetsPlugin()
  ]
};

const config = {
  mode,
  entry,
  module: modules,
  target,
  resolve,
  plugins,
  optimization,
  performance: {
    hints: 'warning', // 枚举
    maxAssetSize: 30000000, // 整数类型（以字节为单位）
    maxEntrypointSize: 50000000, // 整数类型（以字节为单位）
    assetFilter: function (assetFilename) {
      // 提供资源文件名的断言函数
      return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
    }
  }
};

if (!isProd) {
  config.devtool = devtool;
  config.devServer = {
    port,
    proxy,
    compress: true,
    noInfo: true
  };
}

module.exports = config;
