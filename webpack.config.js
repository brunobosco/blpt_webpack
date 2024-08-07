const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const PugPlugin = require('pug-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const dirStyles = path.join(__dirname, 'src/styles');
const dirApp = path.join(__dirname, 'src/app');

const dirMedia = path.join(__dirname, 'src/media');
const dirStatic = path.join(__dirname, 'static');
const dirNode = 'node_modules';

module.exports = {
    entry: {
        index: './src/views/pages/index.pug',
    },
    resolve: {
        modules: [dirStyles, dirApp, dirStatic, dirNode],
        alias: {
            Media: dirMedia,
        },
    },

    plugins: [
        new PugPlugin({
            js: {
                filename: 'app.js',
            },
            css: {
                filename: 'style.css',
            },
        }),

        new CopyWebpackPlugin({
            patterns: [{ from: path.resolve(__dirname, 'static'), to: 'static' }],
        }),
    ],

    module: {
        rules: [
            // HTML
            {
                test: /\.pug$/,
                loader: PugPlugin.loader,
            },

            // CSS
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },

            // JS
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },

            // Images
            {
                test: /\.(jpe?g|png|gif|svg|fnt|webp)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'media/[name].[hash:8][ext]',
                },
            },

            // Fonts
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]',
                },
            },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
};
