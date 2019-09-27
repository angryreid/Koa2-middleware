const fs = require("fs");

// ../test.json does't work ?
// ../package.json must ?
fs.readFile("./package.json", (err, data) => {
  if (err) return console.log(err);
  data = JSON.parse(data);
  console.log(data.name, data.homepage);
});
