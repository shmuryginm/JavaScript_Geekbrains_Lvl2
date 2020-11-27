const path = require("path")

module.exports = {
    entry: "./src/shop.js",
    output: {
        path: path.resolve(__dirname, "./public/scripts"),
        filename: "shoppack.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    { loader: "babel-loader" }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
        ]
    }
}