const { MyRouter } = require("../lib/deractor")
const { resolve } = require("path");


export const router = app => {
  const apiPath = resolve(__dirname, "../routes");
  const router = new MyRouter(app, apiPath);

  router.init();
}