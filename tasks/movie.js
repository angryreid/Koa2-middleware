/*
 * Created: 2019-09-29 16:40:03
 * Author : Derek
 * Email : angried@163.com
 * -----
 * Description: get movie list
 */

const Movie = require("../dbs/models/movie");
const cp = require("child_process");
const { resolve } = require("path");

(async () => {
  const script = resolve(__dirname, "../crawler/trailers-list");
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
    let result = data.result;
    result.forEach(async item => {
      let movies = await Movie.find({
        doubanId: item.doubanId
      });
      if (!movies.length) {
        let movie = new Movie(item);
        await movie.save();
      }
    });
  });
})();
