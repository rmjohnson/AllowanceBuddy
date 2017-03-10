const path = require('path');
const webpack = require('webpack');

var config = {
	entry: path.resolve(__dirname, 'react/app.js'),
	output: {
		path: path.resolve(__dirname, 'www/js'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?/,
			loader: 'babel-loader'
		}]
	}
};

module.exports = config;