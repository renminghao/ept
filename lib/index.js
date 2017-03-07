'use strict';

import _ from 'lodash';
import { formatInstruction } from './mod/formatInstruction'

export const Parse = (string, data) => {

	string = string.toString();

	console.log(formatInstruction(string))

	return string;
}
