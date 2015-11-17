module.exports = {
    entry: "./app/js/entry.jsx",
    output: {
        path: __dirname + '/app/js/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.jsx$/, loader: "jsx-loader" }
        ]
    }
};