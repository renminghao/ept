'use strict';

var webpack = require('webpack')

module.exports = {
	entry : {
		browser : './lib/browser.js'
	},
	output : {
		filename : '[name].js',
		path : './dist/',
		library : '[name]',
		libraryTarget : 'umd',
		umdNamedDefine : true
	},
	module : {
		 rules : [{
			test : /\.jsx?$/,
			loader : 'babel-loader',
			options : {
				presets : ['es2015']
			},
			exclude : /node_modules/
		}]
	}
}