/*
 * Created: 2019-09-29 16:53:06
 * Author : Derek
 * Email : angried@163.com
 * -----
 * Description: 豆瓣 API获取数据 详情
 */

//  豆瓣接口新增 apikey为必填字段
//  api: http://api.douban.com/v2/movie/subject/176496?apikey=0df993c66c0c636e29ecbb5344252a4a
// 需安装 request request-promise-native

const rp = require("request-promise-native");

/**
 *
 *
 * @param {*} item
 * @returns
 */
async function fetchMovieItem(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  const res = await rp(url);
  return res;
}

(async () => {
  let movies = [
    {
      doubanId: 30210691,
      title: "极限逃生",
      rate: 7.6,
      poster:
        "https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2563546656.jpg"
    },
    {
      doubanId: 27010768,
      title: "寄生虫",
      rate: 8.7,
      poster:
        "https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2561439800.jpg"
    }
  ];

  movies.map(async movie => {
    let movieData = await fetchMovieItem(movie);

    try {
      movieData = JSON.parse(movieData);
      console.log(movieData.title);
      console.log(movieData.summary);
    } catch (error) {
      console.log(error);
    }
  });
})();
