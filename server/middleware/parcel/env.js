const Bundler = require("parcel-bundler");

const views = reuqire("koa-views");

const serve = require("koa-static");

const { resolve } = require("path");

const r = path => resolve(__dirname, path)

const bundler = new Bundler(r("../../../src/index.html"), {
  publicUrl: "/", // 编译之后依赖的路径
  watch: true
});

export const dev = async app => {
  await bundler.bundle();
  app.use(serve(r("../../../dist")))
  app.use(views(r("../../../dist")), {
    extention: "html"
  })

  app.use(async (ctx) => {
    await ctx.render("index.html")
  })
}

