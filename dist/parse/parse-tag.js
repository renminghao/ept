'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var log = console.log;

var parseStart = exports.parseStart = function parseStart(s, cb) {

	if (s.substring(0, 3) === '{{/') return s;
	if (s.substring(0, 2) !== '{{') return s;

	var REG = new RegExp('\{\{.*?\}\}', 'im');

	if (REG.test(s)) {

		var l = RegExp.leftContext,
		    c = RegExp.lastMatch,
		    r = RegExp.rightContext;

		cb && cb({
			leftContent: [l],
			currentTag: [c]
		}, r);
	}
};

var parseEnd = exports.parseEnd = function parseEnd(s, cb) {

	if (s.substring(0, 3) !== '{{/') return s;

	var REG = new RegExp('\{\{\/.*?\}\}', 'im');

	if (REG.test(s)) {

		var l = RegExp.leftContext,
		    c = RegExp.lastMatch,
		    r = RegExp.rightContext;

		cb && cb({
			leftContent: [l],
			currentTag: [c]
		}, r);
	}
};

var parseString = exports.parseString = function parseString(s, cb) {

	var index = s.indexOf('{{');

	var left = s,
	    content = '';

	if (index !== -1) {
		left = s.substring(0, index);
		content = s.substring(index);
	}

	cb && cb({
		leftContent: [left],
		currentTag: []
	}, content);
};