'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Parse = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _formatInstruction = require('./mod/formatInstruction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parse = exports.Parse = function Parse(string, data) {

	string = string.toString();

	console.log((0, _formatInstruction.formatInstruction)(string));

	return string;
};