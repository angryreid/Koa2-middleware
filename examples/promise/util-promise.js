const fs = require("fs");
const util = require("util");

util
  .promisify(fs.readFile)("./package.json")
  .then(data => {
    let { name } = JSON.parse(data);
    console.log(name);
  })
  .catch(err => {
    console.log(err);
  });
