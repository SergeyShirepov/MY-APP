import path from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';
import webpack from 'webpack';



const { DefinePlugin } = webpack;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const NODE_ENV = process.env.NODE_ENV;
const GLOBAL_CSS_REGEXP = /\.global\.css$/;

const serverConfig = {
  target: "node",
  mode: NODE_ENV ? NODE_ENV : 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  entry: path.resolve(__dirname, '../src/server/server.js'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js',
    publicPath: '/static/',
    chunkFilename: '[name].bundle.js',
    libraryTarget: 'module',
    chunkFormat: 'module',
  },
  externals: [nodeExternals({ importType: 'module' })],
  experiments: {
    outputModule: true,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: ['ts-loader'],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
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
        use: ['css-loader'],
        exclude: [
          path.resolve(__dirname, 'node_modules'),
        ],
      },
    ]
  },
  optimization: {
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
    new DefinePlugin({ 'process.env.CLIENT_ID': "'SI6_ql3msvAkDVKeffKG_w'" })
  ],
};

export default serverConfig;