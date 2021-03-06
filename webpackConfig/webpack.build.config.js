/*
* 构建
*/
const path = require('path');
const cfg = require('../package.json');
process.env.NODE_ENV = "production";
module.exports = {
	mode: 'production',
	entry: {
		main: path.resolve(__dirname, '../src/index.js'),
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: '[name].min.js',
		library: cfg.name,
		libraryTarget: 'umd',
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: path.resolve(__dirname, 'node_modules'),
				use: 'babel-loader',
			}, {
				test: /\.css$/,
				exclude: path.resolve(__dirname, 'node_modules'),
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
				]
			}, {
				test: /\.less$/,
				exclude: path.resolve(__dirname, 'node_modules'),
				use: [
					{
						loader: 'style-loader',
					}, {
						loader: 'css-loader',
					}, {
						loader: 'less-loader',
					}
				],
			}, {
				test: /\.(png|jpe?g|git|svg)$/,
				loader: 'url-loader'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.less', '.css', '.json'],
	},
	externals: {
		react: {
			commonjs: 'react',
			commonjs2: 'react',
			amd: 'react',
			root: 'React',
		},
		'react-dom': {
			commonjs: 'react-dom',
			commonjs2: 'react-dom',
			amd: 'react-dom',
			root: 'ReactDOM',
		},
		'immutable': {
			commonjs2: 'immutable',
			commonjs: 'immutable',
			amd: 'immutable',
			root: 'immutable',
		},
		"adaptivecards": {
			commonjs2: 'adaptivecards',
			commonjs: 'adaptivecards',
			amd: 'adaptivecards',
			root: 'adaptivecards',
		}
	}
}