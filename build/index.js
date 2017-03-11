'use strict';

require('babel-polyfill');

var _path = require('path');

var _fs = require('fs');

var _index = require('../dist/index');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var getFileConten = function getFileConten(path) {
	return new Promise(function (resolve) {
		(0, _fs.readFile)((0, _path.resolve)(__dirname, path), function (err, data) {
			if (err) console.log(err);
			resolve(data);
		});
	});
};

var get = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
		var content, result;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						_context.next = 2;
						return getFileConten('./index.ept');

					case 2:
						content = _context.sent;
						result = (0, _index.Render)(content, {
							test1: true,
							test2: false,
							test3: true,
							test4: false,
							items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
							confirm: 'test'
						}, function (data) {
							return console.log(data);
						}, {
							context: __dirname
						});

					case 4:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function get() {
		return _ref.apply(this, arguments);
	};
}();

get().then().catch(function (e) {
	return console.log(e);
});