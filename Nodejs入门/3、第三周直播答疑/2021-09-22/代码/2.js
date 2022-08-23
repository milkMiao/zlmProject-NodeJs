function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function foo() {
    return _foo.apply(this, arguments);
}

function _foo() {
    _foo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var b;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return cool();

                    case 2:
                        b = _context.sent;
                        console.log(b);
                        console.log(2);

                    case 5:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee);
    }));
    return _foo.apply(this, arguments);
}

function cool() {
    return _cool.apply(this, arguments);
}

function _cool() {
    _cool = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt("return", new Promise(function (resolve, reject) {
                            resolve(1);
                        }));

                    case 1:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2);
    }));
    return _cool.apply(this, arguments);
}

console.log(333);
