import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';
import DotenvPlugin from 'webpack-dotenv-plugin';

export default {
  mode: 'development',
  resolve: {
    modules: ['babel-polyfill', path.resolve('src'), 'node_modules'],
    extensions: ['*', '.js', '.json'],
    alias: {
      '@Actions': path.resolve(__dirname, 'src/actions/'),
      '@Shared': path.resolve(__dirname, 'src/components/shared/'),
      '@Utils': path.resolve(__dirname, 'src/utils/'),
      '@StaticData': path.resolve(__dirname, 'src/static-data/'),
      '@Styles': path.resolve(__dirname, 'src/styles/'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@HOC': path.resolve(__dirname, 'src/hoc'),
    },
  },
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'eval-source-map',
  entry: [
    // must be first entry to properly set public path
    './src/webpack-public-path',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index.js'),
  ],
  // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  target: 'web',
  node: {
    fs: 'empty',
  },
  output: {
    // Note: Physical files are only output by the production build task `npm run build`.
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new DotenvPlugin({
      sample: './.env.default',
      path: './.env',
    }),
    new webpack.DefinePlugin({
      // Tells React to build in either dev or prod modes. https://facebook.github.io/react/downloads.html (See bottom)
      'process.env.NODE_ENV': JSON.stringify('development'),
      // eslint-disable-next-line quote-props
      __DEV__: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // Create HTML file that includes references to bundled CSS and JS.
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    /* new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      // set to false to see a list of every file being bundled.
      noInfo: true,
      options: {
        context: '/',
        postcss: () => [autoprefixer],
      },
    }),*/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.eot(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ico)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /(\.css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer],
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /(\.scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
