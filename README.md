###	EPT
####	前言

目前node平台上面的模板解析数不胜数，各个解析引擎都的优势都各有千秋，但是我自己在项目实践中，却发现很难满足我的需求，因为我自己是一个js工程师，我肯定希望能够以js的语法写javascript内容的同时能够来写模板，这样子能够大量减少我的工作思维切换的成本，目前平台上面流行的模板，或多或少的都是有自己自定义的语法，因此我需要创建一个解析引擎来100%的集成javasciprt的预发，减少思维切换的成本

####	优势
-	代码简单
	-	只有不到100行代码，就能简单的实现核心功能，指令分解，指令收集，指令解析，能够输入一段`ept`模板代码然后输出html代码
-	纯javascript语法
	-	能够100%的服用javascript的语法，只需要在指令内容前后加上`{{% xxx %}}`代码就ept引擎就能够正常的解析并且返回数据

####	项目开发

```bash
	git clone git@github.com:renminghao/ept.git
	npm install
	npm run dev
```
####	安装

```bash
	npm install ept
```

####	使用

浏览器版本在window对象下面暴露了一个EPT对象，改EPT对象和node模式下的EPT对象使用方法基本保持一致

-	渲染字符串
```bash
new EPT('<ul>
		{{% for(var i = 0; i < items.length; i++){ %}}
			{{% if(i == 1){ %}}
				<span class="{{% if(items[i]){ %}}test{{% } %}}">test</span>
			{{% } %}}
			<li>
				{{items[i]}}-{{i}}
			</li>
		{{% } %}}
	</ul>',{
		items : [1,2,3,4,5,6,7,8,9]
	},callback).render()			
```
render方法执行渲染，渲染结果是
<pre>
1-0
test
2-1
3-2
4-3
5-4
6-5
7-6
8-7
9-8
</pre>

-	集成模板渲染
	-	web环境
```bash
new EPT('
	{{% extend("./test.ept") %}}
		<ul>
			{{% for(var i = 0; i < items.length; i++){ %}}
				{{% if(i == 1){ %}}
					<span class="{{% if(items[i]){ %}}test{{% } %}}">test</span>
				{{% } %}}
				<li>
					{{items[i]}}-{{i}}
				</li>
			{{% } %}}
		</ul>
	{{% /extend %}}',{
		items : [1,2,3,4,5,6,7,8,9]
	},callback).render()	
```
	-	node环境
```bash
new EPT('
	{{% extend("./test.ept") %}}
		<ul>
			{{% for(var i = 0; i < items.length; i++){ %}}
				{{% if(i == 1){ %}}
					<span class="{{% if(items[i]){ %}}test{{% } %}}">test</span>
				{{% } %}}
				<li>
					{{items[i]}}-{{i}}
				</li>
			{{% } %}}
		</ul>
	{{% /extend %}}',{
		items : [1,2,3,4,5,6,7,8,9]
	},callback,{
		context : __dirname
	}).render()	
```

两者区别在于，web环境我可以自己去查找集成的文件地址，但是node环境下需要手动增加context配置，使得能够正常的去查找被继承文件

-	test.ept
```bash
<!doctype>
<html>
	<head>
		<title>Test Demo</title>
	</head>
	<body>
		{{% block() %}}
	</body>
</html>
```

###	继承语法
-	__block()__

block()为填充内容，block为保留字，后续集成模板的模板内容会填充到`{{%block()%}}`的地方，将该字符串进行替换

- 	__extend(xxx)-/extend__

extend为集成方法保留字，ept会获取`()`中间的文件的内容，并且将`extend-/extend`中的和被继承模板进行结合

###	暴露方法(dist/mod/instruction)

-	getInstruction（string）

传入string，getInstruction会将其中的指令拆出来，返回一个array，array内容为指令内容

__input__

```bash
	{{% for(var i = 0; i < items.length; i++){ %}}
		{{% if(i == 1){ %}}
			<span class="{{% if(items[i]){ %}}test{{% } %}}">test</span>
		{{% } %}}
		<li>
			{{items[i]}}-{{i}}
		</li>
	{{% } %}}
```

__output__

```bash
[
	{{% for(var i = 0; i < items.length; i++){ %}},
	{{% if(i == 1){ %}},
	<span class=",
	{{% if(items[i]){ %}},
	test,
	{{% } %}},
	">test</span>,
	{{% } %}},
	<li>,
	{{items[i]}},
	-,
	{{i}},
	</li>,
	{{% } %}}
]
```

- 	formatInstruction（instructionArray,data）

将输入的指令和data内容进行整合，并且返回最新运算后的内容，如果出错，则抛出异常

__input__

```bash
[
	{{% for(var i = 0; i < items.length; i++){ %}},
	{{% if(i == 1){ %}},
	<span class=",
	{{% if(items[i]){ %}},
	test,
	{{% } %}},
	">test</span>,
	{{% } %}},
	<li>,
	{{items[i]}},
	-,
	{{i}},
	</li>,
	{{% } %}}
],
{
	items : [1,2,3,4]
}
```

__output__

```bash
1-0
test
2-1
3-2
4-3
```

欢迎使用

MIT License

Copyright (c) 2016 renminghao

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
