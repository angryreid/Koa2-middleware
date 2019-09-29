const Koa = require("koa");
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = "koa movie";
});

app.listen(2233);
