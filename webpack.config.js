var path = require("path");

module.exports = {
    entry: {
        app: ["./js/main.js"]
    },
    output: {
        path: path.resolve(__dirname, "js"),
        publicPath: "/js/",
        filename: "app.js"
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            vuex: "vuex/dist/vuex.js"
        }
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: '/node_modules/',
                loader: "vue-loader"
            },
            {
                test: /\.js$/,
                loader: 'ify-loader'
            }
        ]
    },
    devServer: {
        index: "./index.html"
    }
};