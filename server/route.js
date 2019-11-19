const Router = require("koa-router");
const route = new Router();

const Movie = require("../dbs/models/movie");


@controller("/api/v/movies")

eport


route.get("/all", async (ctx, next) => {
  const movies = await Movie.find({}).sort({
    "meta.createdAt": -1
  })

  ctx.body = {
    movies
  }
})

route.get("/detail/:id", async (ctx, next) => {
  const id = ctx.params.id;
  const movies = await Movie.findOne({_id: id})
  ctx.body = {
    movies
  }
})

module.exports = route;