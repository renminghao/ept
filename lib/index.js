'use strict';

import _ from 'lodash';
import { getInstruction, formatInstruction } from './mod/formatInstruction'

export const Parse = (string, data) => {

	string = string.toString();

	let instruction = getInstruction(string);
	let compile = formatInstruction(instruction,data)
	
	return string;
}
