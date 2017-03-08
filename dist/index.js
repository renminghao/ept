'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Parse = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _formatInstruction = require('./mod/formatInstruction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parse = exports.Parse = function Parse(string, data, callback) {

	string = string.toString();

	var instruction = (0, _formatInstruction.getInstruction)(string);
	var compiled = (0, _formatInstruction.formatInstruction)(instruction, data);

	callback && callback(compiled);
};