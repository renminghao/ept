'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Parse = undefined;

var _extend = require('./mod/extend');

var _extend2 = _interopRequireDefault(_extend);

var _instruction = require('./mod/instruction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parse = exports.Parse = function Parse(string, data, callback, config) {
	config = config || {};
	string = string.toString();

	var extend = (0, _extend2.default)(string, config);

	var instruction = (0, _instruction.getInstruction)(extend);
	var compiled = (0, _instruction.formatInstruction)(instruction, data);

	callback && callback(compiled);
};