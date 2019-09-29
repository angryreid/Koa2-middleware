/*
 * Created: 2019-09-29 16:04:18
 * Author : Derek
 * Email : angried@163.com
 * -----
 * Description: Trailers 剧场预告片,影院预告片,剧场版预告片
 * 子进程获取数据
 */

const puppeteer = require("puppeteer");

const url = `https://movie.douban.com/tag/#/?sort=U&range=6,10&tags=`;

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

  await page.goto(url, {
    waitUntil: "networkidle2"
  });

  await sleep(3000);

  await page.waitForSelector(".more");

  for (let i = 0; i < 1; i++) {
    await sleep(3000);
    await page.click(".more");
  }

  const result = await page.evaluate(() => {
    var $ = window.$;
    var items = $(".list-wp a");
    var links = [];

    if (items.length) {
      items.each((index, itme) => {
        let it = $(itme);
        let doubanId = it.find("div").data("id");
        let title = it.find(".title").text();
        let rate = Number(it.find(".rate").text());
        let poster = it
          .find("img")
          .attr("src")
          .replace("s_ratio", "l_ratio");

        links.push({
          doubanId,
          title,
          rate,
          poster
        });
      });
    }
    return links;
  });

  browser.close();
  // console.log(result);

  // 发送获取到的数据
  process.send({result});
  process.exit(0);
  // 进程退出
})();
