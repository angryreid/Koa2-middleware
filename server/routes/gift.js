const { controller, get, post, all, del } = require("../lib/deractor");
const {
  getUserGift,
  addUserGift
} = require("../service/gift");

@controller("gift/list")
export class MovieController {
  @get("/")
  async getUserGift(ctx, next) {
    let { type, year } = ctx.query;
    // const movies = await getUserGift(type, year);
    const gift = [
      {
        id: "2312313",
        title: "五周年礼物兑换券",
        startDate: "2019.11.26",
        endDate: "不限期",
        gift: "口红（￥600）"
      },
      {
        id: "2312313",
        title: "五周年礼物兑换券",
        startDate: "2019.11.26",
        endDate: "不限期",
        gift: "口红（￥600）"
      },
      {
        id: "2312313",
        title: "五周年礼物兑换券",
        startDate: "2019.11.26",
        endDate: "不限期",
        gift: "口红（￥600）"
      },
      {
        id: "2312313",
        title: "五周年礼物兑换券",
        startDate: "2019.11.26",
        endDate: "不限期",
        gift: "口红（￥600）"
      },
      {
        id: "2312313",
        title: "五周年礼物兑换券",
        startDate: "2019.11.26",
        endDate: "不限期",
        gift: "口红（￥600）"
      },
      {
        id: "2312313",
        title: "五周年礼物兑换券",
        startDate: "2019.11.26",
        endDate: "不限期",
        gift: "口红（￥600）"
      }
    ]
    ctx.body = {
      gift
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
