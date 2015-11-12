module.exports = {
    entry: "./app/js/entry.js",
    output: {
        path: __dirname + '/app/js/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};