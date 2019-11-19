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
const Movie = require("../dbs/models/movie");
const Category = require("../dbs/models/category");

/**
 *
 *
 * @param {*} item
 * @returns
 */
async function fetchMovieItem(item) {
  const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}?apikey=0df993c66c0c636e29ecbb5344252a4a`;
  const res = await rp(url);
  let body;
  try {
    body = JSON.parse(res);
  } catch (error) {
    console.log(error);
  }
  return body;
}

(async () => {
  // let movies = [
  //   {
  //     doubanId: 30210691,
  //     title: "极限逃生",
  //     rate: 7.6,
  //     poster:
  //       "https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2563546656.jpg"
  //   },
  //   {
  //     doubanId: 27010768,
  //     title: "寄生虫",
  //     rate: 8.7,
  //     poster:
  //       "https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2561439800.jpg"
  //   }
  // ];

  let movies = await Movie.find({
    $or: [
      { summary: { $exists: false } },
      { summary: null },
      { title: "" },
      { summary: "" }
    ]
  });

  for (let i = 0; i < [movies[0]].length; i++) {
    let movie = movies[i];

    let movieData = await fetchMovieItem(movie);

    if (movieData) {
      let tags = movieData.tags || [];
      // 设置tag标签
      tags.forEach(tag => {
        movie.tags.push(tag);
      });

      movie.summary = movieData.summary;
      movie.title = movieData.alt_title || movieData.title || "";
      movie.rawTitle = movieData.title || "";
      if (movieData.genres) {
        movie.movieTypes = movieData.genres || [];
        // 设置电影分类
        movie.movieTypes.forEach(async category => {
          let cat = await Category.find({
            name: category
          });
          if (!cat.length) {
            // 查出来分类为空
            cat = new Category({
              name: category,
              movies: [movie._id]
            });
          } else {
            // 分类不为空
            if (cat.movies.indexOf(movie._id) === -1) {
              // 当前分类添加电影
              cat.movies.push(movie._id);
            }
          }
          await cat.save();
          // 当前电影归属分类
          if (cat instanceof Array) {
            cat.forEach(cat_item => {
              if (!movie.category || movie.category.indexOf() === -1) {
                movie.category.push(cat_item._id);
              }
            });
          } else {
            if (!movie.category || movie.category.indexOf() === -1) {
              movie.category.push(cat._id);
            }
          }
        });
      }
      let dates = movieData.pubdates || [];
      let pubdates = [];

      dates.map(item => {
        if (item && item.split("(") > 0) {
          let parts = item.split("(");
          let date = parts[0];
          let country = "未知";
          if (parts[1]) {
            country = parts[1].split(")")[0];
          }
          pubdates.push({
            date: new Date(date),
            country
          });
        }
      });
      // 设置上映日期
      movie.pubdates = pubdates;
      // return;
      await movie.save();
    }
  }

  // movies.map(async movie => {
  //   let movieData = await fetchMovieItem(movie);

  //   try {
  //     movieData = JSON.parse(movieData);
  //     console.log(movieData.title);
  //     console.log(movieData.summary);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
})();
