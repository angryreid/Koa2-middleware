"use strict";

var _export = require("./export");

var _export2 = _interopRequireDefault(_export);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_export2.default); // import fs from "fs";

/**
 * node 环境不支持 import 使用babel进行解析
 * 1. 安装
 * npm i -D babel-cli babel-preset-env
 * 2. 编写 .babelrc
 * 3. package.json 配置命令，使用babel
 * "dev": "nodemon -w src --exec \"babel-node src --presets env\""
 */

// console.log(fs);
//# sourceMappingURL=index.js.map