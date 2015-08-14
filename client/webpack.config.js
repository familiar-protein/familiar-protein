module.exports = {
    entry: "./src/app.jsx",
    output: {
        path: __dirname + "/build",
        filename: "app.js"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: "jsx-loader" }
        ]
    }
};