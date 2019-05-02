const path = require("path");

module.exports = {
    entry     : "./src/index.ts",
    devtool   : "cheap-module-source-map",
    module    : {
        rules : [
            {
                test    : /\.tsx?$/,
                exclude : /node_modules/,
                use     : [{
                    loader  : "ts-loader",
                    options : { onlyCompileBundledFiles: true }
                }]
            },
            {
                test : /\.json$/,
                use  : "json-loader"
            }
        ]
    },
    output : {
        path          : path.join(__dirname, "public"),
        filename      : "index.min.js",
        libraryTarget : "umd"
    },
    resolve : {
        extensions : [".tsx", ".ts", ".d.ts"]
    }
};