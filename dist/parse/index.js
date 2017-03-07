'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Parse = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parse = exports.Parse = function Parse(string, data) {
	string = string.toString();
	console.log(string);

	return string;
};

// import { parseStart, parseEnd, parseString } from './parse-tag'
// const TAG = [{
// 	start : 'if',
// 	end : '/if'
// },{
// 	start : 'each',
// 	end : '/each'
// }];

// export const Parse = (s,d) => {

// 	s = s.toString()
// 	let result = [];
// 	let tagList = [];
// 	while(s && s.length > 0) {

// 		parseStart(s,(obj,str)=>{
// 			obj.leftContent[0] = obj.leftContent[0].replace(/[\n\t]/img,'')
// 			obj.currentTag[0] = obj.currentTag[0].replace(/[\n\t]/img,'')
// 			result = result.concat(obj.leftContent).concat(obj.currentTag);

// 			s = str;
// 		})

// 		parseEnd(s,(obj,str)=>{
// 			obj.leftContent[0] = obj.leftContent[0].replace(/[\n\t]/img,'')
// 			obj.currentTag[0] = obj.currentTag[0].replace(/[\n\t]/img,'')
// 			result = result.concat(obj.leftContent).concat(obj.currentTag);

// 			s = str;
// 		})

// 		parseString(s,(obj,str)=>{
// 			obj.leftContent[0] = obj.leftContent[0].replace(/[\n\t]/img,'')
// 			result = result.concat(obj.leftContent)
// 			s = str;
// 		})

// 		result = _.remove(result,res=>res);
// 	}

// 	return s;
// }