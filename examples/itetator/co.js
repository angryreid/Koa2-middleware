const co = require("co");
const fetch = require("node-fetch");

co(function*() {
  const res = yield fetch("https://api.douban.com/v2/movie/1291843");
  const movie = yield res.json();
  console.log(movie);
  const summary = movie.summary;
  console.log(summary);
});

// co
function run(generator) {
  const itetator = generator();
  const it = itetator.next();
  const promise = it.value();

  promise.then(data => {
    const it2 = itetator.next(data);
    const promise2 = it2.value;

    promise2.then(data2 => {
      itetator.next(data2);
    });
  });
}
