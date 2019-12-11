const Koa = require("koa");
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const mongoose = require("mongoose");
const dbConfig = require("./dbs/config");
const { resolve } = require("path");
const R = require("ramda");
const MIDDLEWARES = ["router"];
const app = new Koa();

// const Redis = require("koa-redis");
// const session = require("koa-generic-session");

// const router = require("./server/routes/movie");
// const users = require("./routes/users");

const userMiddlewares = app => {
  R.map(
    R.compose(
      R.forEachObjIndexed(initWith => initWith(app)),
      require,
      name => resolve(__dirname, `./middleware/${name}`)
    )
  )(MIDDLEWARES);
};

async function start() {
  // error handler
  onerror(app);

  // session
  app.keys = ["heys", "keyssss"];
  // app.use(
  //   session({
  //     key: "com",
  //     prefix: "koa",
  //     store: new Redis()
  //   })
  // );

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
      extension: "pug"
    })
  );

  // routes
  // app.use(router.routes(), router.allowedMethods());

  // mongoose
  mongoose
    .set("useCreateIndex", true)
    .connect(dbConfig.dbs, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      global.console.log("<<< success connected to mongodb, server port on 1209");
      (() => {
        // require("./tasks/movie");
        // require("./tasks/api");
      })();
    })
    .catch(err => {
      global.console.log(err);
    });

  await userMiddlewares(app);

  // error-handling
  app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
  });

  app.listen(1209);
}

start();