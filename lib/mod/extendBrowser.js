'use strict'

const extendReg = /\{\{\% *extend\ *\(['"]([\s\S]*?)['"]\)\ *\%\}\}/
const extendEndReg = /\{\{\%\ *\/extend\ *\%\}\}/
const blockReg = /\{\{\%\ * (block\(\))\ *\%\}\}/

const extend = (str,data,getInstruction,formatInstruction,callback)=>{

	if(extendReg.test(str)){

		let template = RegExp.$1;
		template = template.indexOf('.ept') > -1 ? template : `${template}.ept`;

		let a = document.createElement('a');
		a.href = template;
		template = a.href;//转换成http格式

		getdata(template, str, data, getInstruction, formatInstruction, callback);
		return;
	}

	callback && callback(formatInstruction(getInstruction(str),data));

}

const getdata = (href, str, data, getInstruction, formatInstruction, callback) => {

	fetch(href,{
		method : 'get',
		type : 'text'
	})
	.then(template=>template.text())
	.then(template=>{

		template = template.replace(blockReg,str.replace(extendReg,'').replace(extendEndReg,''))
		callback && callback(formatInstruction(getInstruction(template),data));		
	})
	.catch(e=>console.error(e))
}

export default extend