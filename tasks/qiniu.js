const qiniu = require("qiniu");
const nanoid = require("nanoid");
const config = require("../config");

const bucket = config.qiniu.bucket;

const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
const cfg = new qiniu.conf.Config();
const client = new qiniu.rs.BucketManager(mac, cfg);

const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err);
      } else {
        if (info.statusCode === 200) {
          resolve({ key });
        } else {
          reject(info);
        }
      }
    });
  });
};

(async () => {
  let movies = [
    {
      doubanId: "26709258", // 豆瓣Id
      poster:
        "https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2568288336.jpg", // 海报图片
      video:
        "http://vt1.doubanio.com/201909301421/121d33003dc177eef4a8ed797e9b2833/view/movie/M/402510878.mp4", // 预告片地址
      cover: "https://img1.doubanio.com/img/trailer/medium/2566997598.jpg" // 预告片封面图片
    }
  ];
  movies.map(async movie => {
    if (movie.video && !movie.key) {
      try {
        let videoData = await uploadToQiniu(movie.video, nanoid() + ".mp4");
        let coverData = await uploadToQiniu(movie.cover, nanoid() + ".png");
        let posterData = await uploadToQiniu(movie.poster, nanoid() + ".png");

        if (videoData.key) {
          movie.videoKey = videoData.key;
        }
        if (coverData.key) {
          movie.coverKey = coverData.key;
        }
        if (posterData.key) {
          movie.posterKey = posterData.key;
        }
        console.log(movie);
      } catch (error) {
        console.log(error);
      }
    }
  });
})();
