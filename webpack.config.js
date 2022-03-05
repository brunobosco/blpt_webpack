const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const dirStyles = path.join(__dirname, 'src/styles');
const dirApp = path.join(__dirname, 'src/app');

const dirStatic = path.join(__dirname, 'static');
const dirNode = 'node_modules';

const pages = ['index'];

const mapPages = pages.map((file) => {
    return new HtmlWebpackPlugin({
        filename: `${file}.html`,
        template: path.join(__dirname, `src/views/${file}.pug`),
    });
});

module.exports = {
    entry: [path.join(dirApp, 'index.js'), path.join(dirStyles, 'index.scss')],
    resolve: {
        modules: [dirStyles, dirApp, dirStatic, dirNode],
    },

    plugins: [
        ...mapPages,

        new CopyWebpackPlugin({
            patterns: [{ from: path.resolve(__dirname, 'static'), to: 'static' }],
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],

    module: {
        rules: [
            // HTML
            {
                test: /\.pug$/,
                use: ['pug-loader'],
            },

            // CSS
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '',
                        },
                    },
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
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    // outputPath: 'images/',
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
