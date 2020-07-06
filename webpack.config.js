const path = require('path');
const hwp = require('html-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');

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
    optimization: {
        runtimeChunk: 'single',
        namedChunks: false,
        moduleIds: 'hashed',
        splitChunks: {
            chunks: 'all',
            minSize: 1000 * 600,
            // maxSize: 100000,
            // minChunks: 5,
            // maxAsyncRequests: 6,
            // maxInitialRequests: 4,
            // automaticNameDelimiter: '~',
            // name: "18230-4324",
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'initial',
                    test: /[\\/]node_modules[\\/]/,
                    // minChunks: Infinity,
                    chunks: 'all',

                }
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
        new hwp({ template: path.join(__dirname, '/public/index.html'), favicon: path.join(__dirname, '/public/favicon.ico') }),
        new CompressionPlugin(),
        new ServiceWorkerWebpackPlugin({ entry: path.join(__dirname, '/src/serviceWorker.js') })
    ]
}