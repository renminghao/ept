'use strict';
const REG = /\{\{( +)?\%( +)?.*?( +)?\%( +)?\}\}/img
let instruction = [];
let countLenght = 0;

export const formatInstruction = (string) => {
	//去除空格和tab符
	string = string.replace(/[\t\n]/img,'');
	//提取指令使用
	let operaString = string;
	let index = 0;
	//源代码中收集指令
	while(REG.test(operaString)) {
		let l = RegExp.leftContext,
			c = RegExp.lastMatch,
			r = RegExp.rightContext;

		let flag = c.match(/\/\w+/) ? 'end' : 'start';
		let key = c.match(/\/?\w+/)[0]

		instruction.push({
			instruction : c,
			start : l.length,
			end : l.length + c.length,
			flag : flag,
			key : key
		})
		
	}
	//销毁数据重新使用
	console.log(JSON.stringify(instruction,null,2))
	//将指令和指令中的内容进行组合
	let instructionArray = [];
	let flagInstruction = '';
	instruction.map((item,index)=>{
		//记录指令开始地方
		if(item.flag == 'start' && !countLenght){
			countLenght = item.start;
			flagInstruction = item.key;
		}
		//在指令结束地方收集指令体，并销毁计数器
		if(item.flag == 'end' && item.key == `/${flagInstruction}`) {
			instructionArray.push({
				string : operaString.substring(countLenght,item.end),
				start : countLenght,
				end : item.end
			});
			countLenght = 0;
		}
	})

	console.log(JSON.stringify(instructionArray,null,2))
	// return string;
	return null;
}