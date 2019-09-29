const fs = require("fs");
const util = require("util");
const readAsync = util.promisify(fs.readFile);

async function init() {
  try {
    let data = await readAsync("./package.json");
    let { name } = JSON.parse(data);
    console.log(name);
  } catch (error) {
    console.log(error);
  }
}

init();
