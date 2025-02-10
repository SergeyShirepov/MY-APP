import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

const { DefinePlugin } = webpack;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV;
const GLOBAL_CSS_REGEXP = /\.global\.css$/;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';


function setupDevtool() {
  if (IS_DEV) return 'eval';
  if (IS_PROD) return false;
}

const clientConfig = {
  mode: NODE_ENV ? NODE_ENV : 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  entry: path.resolve(__dirname, '../src/client/index.jsx'),
  output: {
    path: path.resolve(__dirname, '../dist/client'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/static/',
  },
  devtool: setupDevtool(),
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader'],
        exclude: [
          path.resolve(__dirname, 'dist'),
          path.resolve(__dirname, 'node_modules'),
        ],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          GLOBAL_CSS_REGEXP
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
              },
            },
          },
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          GLOBAL_CSS_REGEXP
        ],
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['style-loader', 'css-loader'],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: 'src',
              outputPath: 'images',
              publicPath: 'static/images',
            },
          },
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
      },
    ],
  },
  devServer: {
    open: true,
    hot: true,
    devMiddleware: {
      index: true,
      mimeTypes: { html: 'text/html' },
      publicPath: '/static/',
      serverSideRender: true,
      writeToDisk: true,
    },
    client: {
      logging: 'info',
      overlay: true,
    },
    allowedHosts: ['all'],
    static: {
      directory: path.join(__dirname, '../dist/client/'),
    },
    compress: true,
    port: 8080,
    proxy: [
      {
        context: () => true,
        target: 'http://localhost:3000',
      },
    ],
  },
  optimization: {
    minimize: IS_PROD,
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: 'body',
    }),
    new DefinePlugin({ 'process.env.CLIENT_ID': "'SI6_ql3msvAkDVKeffKG_w'" }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/shared/img", to: "images" },
        { from: "src/mockServiceWorker.js", to: "mockServiceWorker.js" },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 8888,
      openAnalyzer: true,
      generateStatsFile: true,
      statsFilename: 'stats.json',
    }),
  ],
};

export default clientConfig;