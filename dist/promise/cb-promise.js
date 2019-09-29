"use strict";

var fs = require("fs");

// ../test.json does't work ?
// ../package.json must ?
fs.readFile("./package.json", function (err, data) {
  if (err) return console.log(err);
  data = JSON.parse(data);
  console.log(data.name, data.homepage);
});
//# sourceMappingURL=cb-promise.js.map