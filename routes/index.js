const router = require("koa-router")();

router.get("/", async (ctx, next) => {
  global.console.log("test console log");
  await ctx.render("index", {
    title: "Hello Koa 2!"
  });
});

router.get("/string", async (ctx, next) => {
  ctx.body = "koa2 string";
});

router.get("/json", async (ctx, next) => {
  ctx.body = {
    title: "koa2 json"
  };
});

router.get("/emma", async (ctx, next) => {
  global.console.log("start:", new Date().getTime());
  await ctx.render("error", {
    message: "emma",
    error: {
      status: "OK",
      stack: "clear"
    }
  });
  global.console.log("end:", new Date().getTime());
});

module.exports = router;
