'use strict';

import Extend from './mod/extend'
import { getInstruction, formatInstruction } from './mod/instruction'

export const Parse = (string, data, callback, config) => {
	config = config || {};
	string = string.toString();

	let extend = Extend(string,config);
	
	let instruction = getInstruction(extend);
	let compiled = formatInstruction(instruction,data)

	callback && callback(compiled)
}
