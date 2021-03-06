// jscs:disable
const path = require("path");
const webpack = require("webpack");
const OccurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();

module.exports = {
    devtool: "cheap-module-source-map",
    entry: {
        bundle: [
            "webpack-hot-middleware/client",
            "webpack/hot/only-dev-server",
            "react-hot-loader/patch",
            "./src/index.js",
            "./public/styles/index.less"
        ],
        vendor: [
            "react",
            "react-dom",
            "animate.css/animate.min.css",
            "semantic-ui-css/semantic.min.css"
        ]
    },
    output: {
        path: path.join(__dirname, "build/public"),
        filename: "[name].js",
        chunkFilename: "[id].chunk.js",
        publicPath: "/build/public/"
    },
    plugins: [
        OccurrenceOrderPlugin,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            filename: "vendor.js",
            minChunks: 2
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development"),
            "__DEV__": true
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: path.join(__dirname, "node_modules"),
                use: ["react-hot-loader/webpack", "babel-loader"],
                include: path.join(__dirname, "src")
            },
            {
                test: /\.(less|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            camelCase: true
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            camelCase: true,
                            strictMath: true
                        }
                    }
                ]
            },
            {
                test: /\.(svg|png|woff|woff2|jpg|gif|ttf|eot)$/,
                use: "url-loader"
            }
        ]
    }
};
