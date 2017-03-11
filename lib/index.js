'use strict';

import Extend from './mod/extend'
import { getInstruction, formatInstruction } from './mod/instruction'

export const Render = (string, data, callback, config) => {

	config = config || {};
	string = string.toString();

	let compiled = formatInstruction(getInstruction(Extend(string,config)),data)

	callback && callback(compiled)
}