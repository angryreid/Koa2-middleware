/*
 * Created: 2019-09-30 10:43:28
 * Author : Derek
 * Email : angried@163.com
 * -----
 * Description: 获取到电影详情页面的封面与视频地址
 */


const cp = require("child_process");
const { resolve } = require("path");

(async () => {
  const script = resolve(__dirname, "../crawler/video");
  const child = cp.fork(script, []);
  let invoked = false;

  child.on("error", err => {
    if (invoked) return false;

    invoked = true;
    console.log(err);
  });

  child.on("exit", code => {
    if (invoked) return;
    invoked = true;
    if (code === 0) {
      console.log("exit normally.");
    } else {
      console.log(new Error("eixt code: " + code));
    }
  });


  child.on("message", data => {
    let result = data.data;
    console.log(result);
  });
})();
