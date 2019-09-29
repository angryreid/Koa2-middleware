"use strict";

var _marked = /*#__PURE__*/regeneratorRuntime.mark(makeIterator);

function makeIterator(arr) {
  var i;
  return regeneratorRuntime.wrap(function makeIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < arr.length)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return arr[i];

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, this);
}

var gen = makeIterator(["eat", "sleep", "guitar"]);

console.log("1", gen.next().value);
console.log("2", gen.next().value);
console.log("3", gen.next().value);
console.log("4", gen.next().value);
console.log("5", gen.next().value);
console.log("6", gen.next().done);
//# sourceMappingURL=generator.js.map