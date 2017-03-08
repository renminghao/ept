'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Parse = undefined;

var _instruction = require('./mod/instruction');

var Parse = exports.Parse = function Parse(string, data, callback) {

	string = string.toString();

	var instruction = (0, _instruction.getInstruction)(string);
	var compiled = (0, _instruction.formatInstruction)(instruction, data);

	callback && callback(compiled);
};