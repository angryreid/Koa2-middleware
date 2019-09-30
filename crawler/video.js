/*
 * Created: 2019-09-29 16:04:18
 * Author : Derek
 * Email : angried@163.com
 * -----
 * Description:
 */

const puppeteer = require("puppeteer");

const base = `https://movie.douban.com/subject/`;
const doubanId = `30413052`;

// 等待定时器
const sleep = time =>
  new Promise(resolve => {
    setTimeout(resolve, time);
  });

// 立即执行函数
(async () => {
  console.log("Start visiting this target page.");

  const browser = await puppeteer.launch({
    args: ["--no-sandBox"],
    dumpio: false
  });

  const page = await browser.newPage();

  await page.goto(base + doubanId, {
    waitUntil: "networkidle2"
  });

  await sleep(1000);

  const result = await page.evaluate(() => {
    var $ = window.$;
    var it = $(".related-pic-video");
    if (it && it.length > 0) {
      var link = it.attr("href");
      var cover = it.css("background-image")
      return {
        link,
        cover
      };
    }
  });

  let video;
  console.log(result);
  if (result.link) {
    await page.goto(result.link, {
      waitUntil: "networkidle2"
    });

    await sleep(2000);

    video = await page.evaluate(() => {
      var $ = window.$;
      var it = $("source");
      if (it && it.length > 0) {
        return it.attr("src");
      }
      return "";
    });
  }

  const data = {
    video,
    doubanId,
    cover: result.cover
  };

  browser.close();
  // console.log(result);

  // 发送获取到的数据
  process.send({ data });
  process.exit(0);
  // 进程退出
})();
