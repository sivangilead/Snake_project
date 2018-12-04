'use strict';
var path=require('path')
var HtmlWebpackPlugin = require("html-webpack-plugin");
var isDev = process.env.NODE_ENV === 'development'

module.exports = {
    // Compile ./browser/index.js
	mode: isDev ? 'development' : 'production',
    entry: ['babel-polyfill', './js/index.js'],
    output: {
        path: __dirname,
        filename: './dist/bundle.js'
    },
    devtool: 'source-map',
    resolve: {
        // What file extensions will webpack look
        extensions: ['.jsx', '.js', '.json'],
    },
	plugins: [
		new HtmlWebpackPlugin({
			filename: "index.html",
			template: "index.html",
			inject: true
		})
	],
    module: {
        rules: [
            {
                // Use babel for files that end in js or jsx.
                test: /jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
    },
	devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
		proxy: {
          '/api': 'http://localhost:5000'
        }
	}
}
