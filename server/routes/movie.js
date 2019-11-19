const { controller, get, post, all, del } = require("../lib/deractor");
const {
  getAllMovies,
  getMovieDetail,
  getRelativeMovie
} = require("../service/movie");

@controller("movie")
export class MovieController {
  @get("/")
  async getAllMovies(ctx, next) {
    let { type, year } = ctx.query;
    const movies = await getAllMovies(type, year);
    ctx.body = {
      movies
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
