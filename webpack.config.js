const path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: "./src/scripts/Shop.js",
    output: {
        path: path.resolve(__dirname, "./public/scripts"),
        filename: "shoppack.js"
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
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
                    { 
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    { loader: "vue-loader" }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}