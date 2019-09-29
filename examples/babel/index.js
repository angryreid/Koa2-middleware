// import fs from "fs";

/**
 * node 环境不支持 import 使用babel进行解析
 * 1. 安装
 * npm i -D babel-cli babel-preset-env
 * 2. 编写 .babelrc
 * 3. package.json 配置命令，使用babel
 * "dev": "nodemon -w src --exec \"babel-node src --presets env\""
 * 4. 使用async等语法，需要安装使用 -S babel-plugin-transform-runtime babel-runtime，并配置babelrc
 */

// console.log(fs);

import ex from "./export";

console.log(ex);
