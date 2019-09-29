"use strict";

var co = require("co");
var fetch = require("node-fetch");

co( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
  var res, movie, summary;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return fetch("https://api.douban.com/v2/movie/1291843");

        case 2:
          res = _context.sent;
          _context.next = 5;
          return res.json();

        case 5:
          movie = _context.sent;

          console.log(movie);
          summary = movie.summary;

          console.log(summary);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

// co
function run(generator) {
  var itetator = generator();
  var it = itetator.next();
  var promise = it.value();

  promise.then(function (data) {
    var it2 = itetator.next(data);
    var promise2 = it2.value;

    promise2.then(function (data2) {
      itetator.next(data2);
    });
  });
}
//# sourceMappingURL=co.js.map