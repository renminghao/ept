'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Render = undefined;

var _extend = require('./mod/extend');

var _extend2 = _interopRequireDefault(_extend);

var _instruction = require('./mod/instruction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Render = exports.Render = function Render(string, data, callback, config) {

	config = config || {};
	string = string.toString();

	var compiled = (0, _instruction.formatInstruction)((0, _instruction.getInstruction)((0, _extend2.default)(string, config)), data);

	callback && callback(compiled);
};