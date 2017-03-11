'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fs = require('fs');

var _path = require('path');

var extendReg = /\{\{\% *extend\ *\(['"]([\s\S]*?)['"]\)\ *\%\}\}/;
var extendEndReg = /\{\{\%\ *\/extend\ *\%\}\}/;
var blockReg = /\{\{\%\ * (block\(\))\ *\%\}\}/;
var cwd = process.cwd();

var extend = function extend(str, config) {

	config = config || {};

	if (extendReg.test(str)) {

		var context = config.context;

		if (!context) {
			throw new Error('有继承模板的语法需要手动传入上下文,形如\n{\n\tcontext:xxx\n}\n');
			return;
		}

		var template = RegExp.$1;
		template = template.indexOf('.ept') > -1 ? template : template + '.ept';
		var templateContent = void 0;
		try {
			templateContent = (0, _fs.readFileSync)((0, _path.join)(context, template), 'utf8');
		} catch (e) {
			templateContent = "";
		}

		if (!blockReg.test(templateContent)) {
			throw new Error('\u96C6\u6210\u7684\u6A21\u677F\u4E2D\u4E0D\u5B58\u5728 {{% block() %}}\u9884\u53D1');
			return;
		}

		return templateContent.replace(blockReg, str.replace(extendReg, '').replace(extendEndReg, ''));
	}

	return str;
};

exports.default = extend;