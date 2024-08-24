import webpack from 'webpack';
import nodemon from 'nodemon';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compiler = webpack(webpackServerConfig);

compiler.run((err, stats) => {
    if (err) {
        console.error('Compilation failed: ', err);
        return;
    }

    console.log(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }));

    compiler.watch({}, (err, stats) => {
        if (err) {
            console.error('Compilation failed: ', err);
            return;
        }

        console.log(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }));

        console.log('Compilation was successful');
    });

    nodemon({
        script: path.resolve(__dirname, '../dist/server/server.js'),
        watch: [
            path.resolve(__dirname, '../dist/server'),
            path.resolve(__dirname, '../dist/client'),
        ]
    }).on('restart', () => {
        console.log('Server restarted!');
    });
});