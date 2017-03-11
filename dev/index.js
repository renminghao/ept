'use strict';
import 'babel-polyfill';
import {resolve as PathResolve} from 'path';
import {readFile} from 'fs';
import {Parse} from '../dist/index';

const getFileConten = (path)=>{
	return new Promise(resolve=>{
		readFile(PathResolve(__dirname,path),(err,data)=>{
			if(err) console.log(err);
			resolve(data);
		})
	})
}

const get = async function (){
	const content = await getFileConten('./index.ept');
	const result = Parse(content,{
			test1 : true,
			test2:false,
			test3:true,
			test4:false,
			items : [1,2,3,4,5,6,7,8,9],
			confirm : 'test'
	},data=>console.log(data),{
		context : __dirname
	});
}

get().then().catch(e=>console.log(e));