var Parse = require('../dist/index').Render;
var extend = require('../dist/mod/extend');
var getInstruction = require('../dist/mod/instruction').getInstruction;
var compile = require('../dist/mod/instruction').compile;
var formatInstruction = require('../dist/mod/instruction').formatInstruction;
var expect = require('chai').expect;

describe('整体函数测试',()=>{
	it('输入输出测试',()=>{
		let Data;
		Parse('{{% if(data){ %}}gone{{% } %}}',{data:true},function (data){
				Data = data
		});
		expect(Data).to.be.equal("gone");
		let Data1;
		Parse('{{% if(data){ %}}done{{% } %}}',{data:false},function (data){
				Data1 = data;
		});
		expect(Data1).to.be.equal("")
	})
})
describe('函数功能测试',()=>{
	it('指令收集测试',()=>{
	  let result = getInstruction(`{{% if(abc){ %}}cde{{%}%}}`).reduce((pre,cur)=>{return cur ? [].concat(pre).concat(cur) : pre},[]).join();
		expect(result).to.be.equal("{{% if(abc){ %}},cde,{{%}%}}")
	})
	it('指令编译功能',()=>{
		let result = compile('{{% if(abc) %}}').trim();
		expect(result).to.be.equal('if(abc)');
		let result1 = compile('{{abc}}').trim();
		expect(result1).to.be.equal('STRING += abc');
	})
	it('指令执行功能',()=>{
		let array = ['{{% if(data){ %}}',"abc","{{% } %}}"];
		let data = {data:true};
		let result = formatInstruction(array,data);
		expect(formatInstruction()).to.be.equal('');
		expect(result).to.be.equal('abc')
	})
})