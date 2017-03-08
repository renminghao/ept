'use strict';

import { getInstruction, formatInstruction } from './mod/formatInstruction'

export const Parse = (string, data, callback) => {

	string = string.toString();

	let instruction = getInstruction(string);
	let compiled = formatInstruction(instruction,data)

	callback && callback(compiled)
}
