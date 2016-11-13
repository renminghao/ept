'use strict';

import {parseTag} from './parse-tag'

export const Parse = (s,d) => {
	const result = parseTag(s,d);
	return result;
}