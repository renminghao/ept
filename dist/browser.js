(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("browser", [], factory);
	else if(typeof exports === 'object')
		exports["browser"] = factory();
	else
		root["browser"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var extendReg = /\{\{\% *extend\ *\(['"]([\s\S]*?)['"]\)\ *\%\}\}/;
var extendEndReg = /\{\{\%\ *\/extend\ *\%\}\}/;
var blockReg = /\{\{\%\ * (block\(\))\ *\%\}\}/;

var extend = function extend(str, data, getInstruction, formatInstruction, callback) {

	if (extendReg.test(str)) {

		var template = RegExp.$1;
		template = template.indexOf('.ept') > -1 ? template : template + '.ept';

		var a = document.createElement('a');
		a.href = template;
		template = a.href; //转换成http格式

		getdata(template, str, data, getInstruction, formatInstruction, callback);
		return;
	}

	callback && callback(formatInstruction(getInstruction(str), data));
};

var getdata = function getdata(href, str, data, getInstruction, formatInstruction, callback) {

	fetch(href, {
		method: 'get',
		type: 'text'
	}).then(function (template) {
		return template.text();
	}).then(function (template) {

		template = template.replace(blockReg, str.replace(extendReg, '').replace(extendEndReg, ''));
		callback && callback(formatInstruction(getInstruction(template), data));
	}).catch(function (e) {
		return console.error(e);
	});
};

exports.default = extend;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var REG = /\{\{\%?[\s\S]*?\%?\}\}/;

var getInstruction = exports.getInstruction = function getInstruction(string) {
	var instruction = [];
	string = string.replace(/[\r\n]/img, '');
	//将代码中指令和内容收集
	while (REG.test(string)) {
		var l = RegExp.leftContext,
		    c = RegExp.lastMatch,
		    r = RegExp.rightContext;
		//l为非指令内容,c为指令内容
		instruction.push(l, c);
		string = r;
	}
	//将尾部内容收集
	instruction.push(string);
	return instruction;
};

var compile = exports.compile = function compile(string) {
	string = string.replace(/(\{\{\%?)/, '').replace(/\%?\}\}/, '');
	return (/[\(\{\}\)]/.test(string) ? string : 'STRING += ' + string
	);
};

var formatInstruction = exports.formatInstruction = function formatInstruction(array, data) {
	if (!array || !array.length) return '';
	array = array.map(function (item) {
		var isInstruction = REG.test(item);
		if (!isInstruction) return 'STRING += \'' + item + '\'';
		return compile(item);
	});
	data = data || {};
	array = array.join('\n');
	array = 'try{\n' + '		var STRING = "";\n' + ' 	this.$DATA = ' + JSON.stringify(data) + '\n' + ' 	with(this.$DATA){\n' + array + '\n' + '		}\n' + '		return STRING;\n' + '	}catch(e){\n' + '		console.error(e)\n' + '	}\n';

	return new Function(array)();
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extendBrowser = __webpack_require__(0);

var _extendBrowser2 = _interopRequireDefault(_extendBrowser);

var _instruction = __webpack_require__(1);

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

/***/ })
/******/ ]);
});