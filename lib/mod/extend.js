'use strict';

import { readFileSync } from 'fs';
import { join } from 'path';

const extendReg = /\{\{\% *extend\ *\(['"]([\s\S]*?)['"]\)\ *\%\}\}/
const extendEndReg = /\{\{\%\ *\/extend\ *\%\}\}/
const blockReg = /\{\{\%\ * (block\(\))\ *\%\}\}/
const cwd = process.cwd();

const extend = (str,config) => {

	config = config || {};

	if(extendReg.test(str)){

		let context = config.context;

		if(!context) {
			throw new Error('有继承模板的语法需要手动传入上下文,形如\n{\n\tcontext:xxx\n}\n');
			return;
		}

		let template = RegExp.$1;
		template = template.indexOf('.ept') > -1 ? template : `${template}.ept`;
		let templateContent
		try{
			templateContent = readFileSync(join(context,template),'utf8');
		}catch(e){
			templateContent = ""
		}

		if(!blockReg.test(templateContent)) {
			throw new Error(`集成的模板中不存在 {{% block() %}}预发`);
			return;
		}

		return templateContent.replace(blockReg,str.replace(extendReg,'').replace(extendEndReg,''))
	}

	return str
}

export default extend