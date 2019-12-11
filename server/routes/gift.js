const { controller, get, post, all, del } = require("../lib/deractor");
const { getUserGift, addUserGift, delUserGift, editUserGift } = require("../service/gift");

@controller("gift/list")
export class MovieController {
  @get("/")
  async getUserGift(ctx, next) {
    let { token } = ctx.query;
    const gifts = await getUserGift(token);
    ctx.body = {
      gifts
    };
  }

  @post("/add")
  async addUserGift(ctx, next) {
    let option = ctx.request.body;
    const success = await addUserGift(option);
    ctx.body = {
      success
    };
  }

  @post("/edit")
  async editUserGift(ctx, next) {
    let option = ctx.request.body;
    const success = await editUserGift(option);
    ctx.body = {
      success
    };
  }

  @post("/del")
  async delUserGift(ctx, next) {
    let { id } = ctx.request.body;
    const success = await delUserGift(id);
    ctx.body = {
      success
    };
  }

  @get("/:id")
  async getMovieDetail(ctx, next) {
    const id = ctx.params.id;
    const movie = await getMovieDetail(id);
    const relativeMovie = await getRelativeMovie(movie);
    ctx.body = {
      data: {
        movie,
        relativeMovie
      }
    };
  }
}
