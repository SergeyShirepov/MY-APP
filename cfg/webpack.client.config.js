import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';

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
              publicPath: 'images',
            },
          },
        ],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
      },
    ],
  },
  optimization: {
    minimize: IS_PROD,
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new HTMLWebpackPlugin({ template: path.resolve(__dirname, '../index.html') }),
    new DefinePlugin({ 'process.env.CLIENT_ID': "SI6_ql3msvAkDVKeffKG_w" })
  ],
};

export default clientConfig;