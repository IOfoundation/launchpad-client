import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import path from 'path';
import DotenvPlugin from 'webpack-dotenv-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
  resolve: {
    modules: [path.resolve('src'), 'node_modules'],
    extensions: ['*', '.js', '.json'],
  },
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'eval-source-map',
  entry: [
    // must be first entry to properly set public path
    './src/webpack-public-path',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?reload=true',
    path.resolve(__dirname, 'src/index.js'), // Defining path seems necessary for this to work consistently on Windows machines.
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
    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.LoaderOptionsPlugin({
      minimize: false,
      debug: true,
      // set to false to see a list of every file being bundled.
      noInfo: true,
      options: {
        context: '/',
        postcss: () => [autoprefixer],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'],
      },
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'file-loader'},
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
      },
      {test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]'},
      {test: /\.ico$/, loader: 'file-loader?name=[name].[ext]'},
      {
        test: /react-icons\/(.)*(.js)$/,
        include: [
          path.resolve(__dirname, './node_modules/react-icons/fa'),
          path.resolve(__dirname, './node_modules/react-icons/md'),
        ],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /(\.css)$/,
        loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader'],
      },
      {
        test: /(\.scss)$/,
        loader: ExtractTextPlugin.extract({
          loader: ['css-loader', 'sass-loader'],
          fallbackLoader: 'style-loader',
        }),
      },
    ],
  },
};
