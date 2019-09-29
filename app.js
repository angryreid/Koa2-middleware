const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");
const mongoose = require("mongoose");
const dbConfig = require("./dbs/config");
// const Redis = require("koa-redis");
const session = require("koa-generic-session");

const index = require("./routes/index");
// const users = require("./routes/users");

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
    extension: "ejs"
  })
);

// routes
app.use(index.routes(), index.allowedMethods());
// app.use(users.routes(), users.allowedMethods());

// mongoose
// mongoose
//   .connect(dbConfig.dbs, {
//     useNewUrlParser: true
//   })
//   .then(() => {
//     global.console.log("success connected to mongodb");
//   })
//   .catch(err => {
//     global.console.log(err);
//   });

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;