'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var REG = /\{\{\%?[\s\S]*?\%?\}\}/;
var instruction = [];
var countLenght = 0;

var getInstruction = exports.getInstruction = function getInstruction(string) {
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
	if (!array.length) return '';
	array = array.map(function (item) {
		var isInstruction = REG.test(item);
		if (!isInstruction) return 'STRING += \'' + item + '\'';
		return compile(item);
	});
	array = array.join('\n');
	array = 'try{\n' + '		var STRING = "";\n' + ' 	this.$DATA = ' + JSON.stringify(data) + '\n' + ' 	with(this.$DATA){\n' + array + '\n' + '		}\n' + '		return STRING;\n' + '	}catch(e){\n' + '		console.log(e)\n' + '	}\n';
	return new Function(array)();
};