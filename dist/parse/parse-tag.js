'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.parseTag = undefined;

var _htmlAst = require('html-ast');

var parseTag = exports.parseTag = function parseTag(s, d) {

	var explainExp = /^{[^}\s]+(\s+\([\s\w]+\))*}$/;
	var result = (0, _htmlAst.Parse)(s);
	return result;
	// return s;
};