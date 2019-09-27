"use strict";

var fs = require("fs");
var util = require("util");

util.promisify(fs.readFile)("./package.json").then(function (data) {
  var _JSON$parse = JSON.parse(data),
      name = _JSON$parse.name;

  console.log(name);
}).catch(function (err) {
  console.log(err);
});
//# sourceMappingURL=util-promise.js.map