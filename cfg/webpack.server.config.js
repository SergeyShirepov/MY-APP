const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV;
const GLOBAL_CSS_REGEXP = /\.global\.css$/;

module.exports = {
  target: "node", // Указывает, что сборка предназначена для Node.js
  mode: NODE_ENV ? NODE_ENV : 'development', // Устанавливает режим сборки
  entry: path.resolve(__dirname, '../src/server/server.js'), // Входной файл
  output: {
    path: path.resolve(__dirname, '../dist/server'), // Директория для выходного файла
    filename: 'server.js' // Имя выходного файла
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // Расширения файлов для обработки
  },
  externals: [nodeExternals()], // Исключает node_modules из сборки
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/, // Обрабатывает файлы с расширениями .js, .jsx, .ts, .tsx
        use: ['ts-loader'], // Использует ts-loader для обработки TypeScript файлов
        exclude: /node_modules/, // Исключает node_modules из обработки
      },
      {
        test: /\.css$/, // Обрабатывает CSS файлы
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                exportOnlyLocals: true, // Экспортирует только локальные классы
              },
            },
          },
          'less-loader',
        ],
        exclude: GLOBAL_CSS_REGEXP,
        exclude: /node_modules/, // Исключает node_modules из обработки
      },
      {
        test: GLOBAL_CSS_REGEXP,
        use: ['css-loader']
    },
    {
      test: /\.(png|jpe?g|gif|svg)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: 'src', // Prevents the [path] from being too long
            outputPath: 'images',
            publicPath: 'images',
          },
        },
      ],
    },
    ]
  },
  optimization: {
    minimize: false, // Отключает минимизацию для серверного кода
  },
  plugins: [
    // Добавьте DefinePlugin, если необходимо
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    // })
  ],
};