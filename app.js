const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const mongoose = require("mongoose");
const dbConfig = require("./dbs/config");
const Redis = require("koa-redis");
const session = require("koa-generic-session");
const pv = require("./middleware/koa-pv");
const m1 = require("./middleware/m1");
const m2 = require("./middleware/m2");
const m3 = require("./middleware/m3");

const index = require("./routes/index");
const users = require("./routes/users");

// error handler
onerror(app);

// session
app.keys = ["heys", "keyssss"];
app.use(
  session({
    key: "com",
    prefix: "cn",
    store: new Redis()
  })
);


/**
 * 中间件 
 * 从上到下去引用，洋葱结构。
 * m1 middleware start!
 * m2 middleware start!
 * m3 middleware start!
 * 
 * m3 end!
 * m2 end!
 * m1 end!
 */
app.use(m1())
app.use(m2())
app.use(m3())
app.use(pv())
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "ejs"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// mongoose
mongoose
  .connect(dbConfig.dbs, {
    useNewUrlParser: true
  })
  .then(() => {
    global.console.log("success connected to mongodb");
  })
  .catch(err => {
    global.console.log(err);
  });

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
