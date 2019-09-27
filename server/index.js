const Koa = require("koa");
const logger = require("koa-logger");

const app = new Koa();

// everything is middleware

const md1 = async (ctx, next) => {
  ctx.type = "text/html;charset=utf-8";
  await next();
  ctx.body = ctx.body + " md1";
};

const md2 = async (ctx, next) => {
  ctx.body = "Hi";
  await next();
  ctx.body = ctx.body + " md2";
};

const md3 = async (ctx, next) => {
  ctx.body = ctx.body + " Luck";
  await next();
  ctx.body = ctx.body + " md3";
};

app.use(logger());
app.use(md1);
app.use(md2);
app.use(md3);

// app.use(async (ctx, next) => {
//   ctx.type = "text/html;charset=utf-8";
//   ctx.body = "Hi Luke";
// });

app.listen(2333);
