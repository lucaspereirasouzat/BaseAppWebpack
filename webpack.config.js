const path = require('path');
const hwp = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
// const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
// const webpack = require('webpack');
const DotenvPlugin = require('webpack-dotenv-plugin');

module.exports = {
    entry:
        path.join(__dirname, '/src/index.js')
    ,
    output: {
        filename: '[name].bundle.js',
        publicPath: '/',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, '..', 'public')

    },
    resolve: {
        alias: {
            components: path.resolve(__dirname, 'src/components/'),
            services: path.resolve(__dirname, 'src/services/'),
            utils: path.resolve(__dirname, 'src/utils/'),
            screens: path.resolve(__dirname, 'src/screens/'),
            reduxState: path.resolve(__dirname, 'src/reduxState/'),
            assets: path.resolve(__dirname, 'src/assets/'),
            typo: path.resolve(__dirname, 'src/typo/'),
        }
    },
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'public')
    },
    module: {
        rules: [{
            test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        hash: 'sha512',
                        digest: 'hex',
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    options: {
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: true,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        },
                    }
                }
            ],
        }, {
            test: /\.(js|jsx)?$/,
            enforce: "pre", // preload the jshint loader
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            ],
        },
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff'
                    }
                }
            ],
        },
        {
            test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/octet-stream'
                    }
                }
            ],
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/vnd.ms-fontobject'
                    }
                }
            ],
        },
        {
            test: /\.css$/,
            loader: 'style-loader'
        }, {
            test: /\.css$/,
            loader: 'css-loader',
            options: {
                modules: true,
                // localsConvention: 'camelCase',
                sourceMap: true
            },

        }
        ]
    },
    performance: {
        // maxEntrypointSize: 500,
        maxAssetSize: 300,
        assetFilter: function (assetFilename) {
            return assetFilename.endsWith('.js');
        }
    },
    mode: 'development',
    optimization: {
        usedExports: true,
        runtimeChunk: 'single',
        namedChunks: false,
        moduleIds: 'hashed',
        splitChunks: {
            chunks: 'all',
            minSize: 0,
            // maxSize: 100000,
            // minChunks: 5,
            // maxAsyncRequests: 6,
            maxInitialRequests: Infinity,
            // automaticNameDelimiter: '~',
            // name: "18230-4324",
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {

                        // get the name. E.g. node_modules/packageName/not/this/part.js
                        // or node_modules/packageName
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

                        // npm package names are URL-safe, but some servers don't like @ symbols
                        return `npm.${packageName.replace('@', '')}`;
                    }
                },
                // commons: {
                //     name: 'commons',
                //     chunks: 'initial',
                //     test: /[\\/]node_modules[\\/]/,
                //     // minChunks: Infinity,
                //     chunks: 'all',

                // }
            }
        },
        // minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,

                    },
                },
                cache: true,
                test: /\.js(\?.*)?$/i,
                extractComments: 'all',
                sourceMap: true,
                // minify: true
            }),
        ],
    },
    plugins: [
        new DotenvPlugin({
            sample: './.env.default',
            path: './.env'
        }),
        new hwp({ template: path.join(__dirname, '/public/index.html'), favicon: path.join(__dirname, '/public/favicon.ico') }),
        new CompressionPlugin(),
        new WorkboxPlugin.InjectManifest({
            swSrc: path.resolve(__dirname, 'src/src-sw.js'),
            include: [
                /\.html$/,
                /\.js$/,
                /\.css$/,
                /\.woff2$/,
                /\.jpg$/,
                /\.png$/,
                /\.json$/
            ],
            maximumFileSizeToCacheInBytes: 1000 * 1024 * 1024,

        }),
        new CopyPlugin({
            patterns: [
                { from: 'public/images', to: 'images' },
                { from: 'public/manifest', to: 'manifest' },
            ],
        }),

    ]
}