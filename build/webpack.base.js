const path = require("path");
const dev = require("./webpack.dev");
const prod = require("./webpack.prod");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = env => {
    let isDev = env.development;
    const base = {
        entry: "./src/index.js",
        output: {
            filename: "[name].js",
            path: path.resolve(__dirname, "../dist")
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        !isDev && MiniCssExtractPlugin.loader,
                        isDev && 'style-loader',
                        "css-loader"
                    ].filter(Boolean)
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader'
                        }
                    ]
                }
            ]
        },
        plugins: [
            !isDev && new MiniCssExtractPlugin({
                filename: "css/[name].css"
            }),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: path.resolve(__dirname, "../public/index.html"),
                hash: true,
                minify: {
                    removeAttributeQuotes: true
                }
            }),
        ].filter(Boolean)
    };
    if (isDev) {
        return merge(base, dev);
    } else {
        return merge(base, prod);
    }
};