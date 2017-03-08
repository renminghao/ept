'use strict';
const REG = /\{\{\%?[\s\S]*?\%?\}\}/

export const getInstruction = (string) => {
	let instruction = [];
	string = string.replace(/[\r\n]/img,'')
	//将代码中指令和内容收集
	while(REG.test(string)) {
		let l = RegExp.leftContext,
			c = RegExp.lastMatch,
			r = RegExp.rightContext;
		//l为非指令内容,c为指令内容
		instruction.push(l,c);
		string = r;		
	}
	//将尾部内容收集
	instruction.push(string)
	return instruction;
}

export const compile = string => {
	string = string.replace(/(\{\{\%?)/,'').replace(/\%?\}\}/,'');
	return /[\(\{\}\)]/.test(string) ? string : `STRING += ${string}`;
}

export const formatInstruction = (array,data) => {
	if(!array.length) return '';
	array = array.map(item=>{
		let isInstruction = REG.test(item);
		if(!isInstruction) return `STRING += '${item}'`;
		return compile(item);
	})
	array = array.join('\n');
	array = 
					'try{\n' + 
					'		var STRING = "";\n' +
					' 	this.$DATA = ' + JSON.stringify(data) + '\n' + 
					' 	with(this.$DATA){\n' + 
								array + '\n' +
					'		}\n' +
					'		return STRING;\n' +
					'	}catch(e){\n' + 
					'		console.log(e)\n' +
					'	}\n'
	return new Function(array)()
}