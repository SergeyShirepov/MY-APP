const path = require('path');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

function setupDevtool() {
    if (IS_DEV) return 'eval';
    if (IS_PROD) return false; // Отключение source maps для продакшн
}

module.exports = {
    mode: NODE_ENV ? NODE_ENV : 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    entry: path.resolve(__dirname, '../src/client/index.jsx'),
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: 'client.js'
    },
    devtool: setupDevtool(),
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: ['ts-loader'],
                exclude: /node_modules/,
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
                            },
                        },
                    },
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
        // Добавьте HTMLWebpackPlugin, если необходимо
        // new HTMLWebpackPlugin({ template: path.resolve(__dirname, '../src/client/index.html') })
    ],
};