'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extendBrowser = require('./mod/extendBrowser');

var _extendBrowser2 = _interopRequireDefault(_extendBrowser);

var _instruction = require('./mod/instruction');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EPT = function () {
	function EPT(string, data, callback) {
		_classCallCheck(this, EPT);

		this.string = string || "";
		this.data = data || {};
		this.callback = callback || undefined;
	}

	_createClass(EPT, [{
		key: 'render',
		value: function render() {
			(0, _extendBrowser2.default)(this.string || "", this.data || {}, _instruction.getInstruction, _instruction.formatInstruction, this.callback);
		}
	}]);

	return EPT;
}();

window.EPT = EPT;