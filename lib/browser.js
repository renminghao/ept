'use strict';

import ExtendByBrowser from './mod/extendBrowser'
import { getInstruction, formatInstruction } from './mod/instruction'

class EPT {

	constructor(string,data,callback) {

	 	this.string = string || "";
		this.data = data || {};
		this.callback = callback || undefined;

	}

	render() {
		ExtendByBrowser(this.string || "", this.data || {}, getInstruction, formatInstruction, this.callback)
	}
}

window.EPT = EPT;