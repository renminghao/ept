'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Parse = undefined;

var _parseTag = require('./parse-tag');

var Parse = exports.Parse = function Parse(s, d) {
	var result = (0, _parseTag.parseTag)(s, d);
	return result;
};