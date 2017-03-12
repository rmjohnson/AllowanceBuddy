const path = require('path');
const webpack = require('webpack');

const config = {
	entry: path.resolve(__dirname, 'react/app.js'),
	output: {
		path: path.resolve(__dirname, 'www/js'),
		filename: 'bundle.js',
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel-loader', },
			{ test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }
		],
	},
};

module.exports = config;