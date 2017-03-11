'use strict';

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