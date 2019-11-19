const Router = require("koa-router");
const { resolve } = require("path");
const _ = require("lodash");
const glob = require("glob");

const symbolPrefix = Symbol("prefix");
const routerMap = new Map();
const isArray = c => (_.isArray(c) ? c : [c]);

export class MyRouter {
  constructor(app, apiPath) {
    this.app = app;
    this.apiPath = apiPath;
    this.router = new Router();
  }

  init() {
    glob.sync(resolve(this.apiPath, "./**/*.js")).forEach(require);
    for (let [config, controller] of routerMap) {
      const controllers = isArray(controller);
      // const prefixPath = config.target.symbolPrefix; // 无法获取数据
      const prefixPath = config.target[symbolPrefix];

      if (prefixPath) {
        prefixPath = normalizePath(prefixPath);
      }
      const routerPath = prefixPath + config.path;
      // console.log(routerPath);
      this.router[config.method](routerPath, ...controllers);
    }
    this.app.use(this.router.routes());
    this.app.use(this.router.allowedMethods());
  }
}

export const normalizePath = path => (path.startsWith("/") ? path : `/${path}`);

export const router = config => (target, key, description) => {
  config.path = normalizePath(config.path);
  routerMap.set(
    {
      target: target,
      ...config
    },
    target[key]
  );
  return description;
};

export const controller = path => target => {
  target.prototype[symbolPrefix] = path;
};

export const get = path =>
  router({
    method: "get",
    path: path
  });

export const post = path =>
  router({
    method: "post",
    path: path
  });

export const put = path =>
  router({
    method: "put",
    path: path
  });

export const del = path =>
  router({
    method: "del",
    path: path
  });

export const use = path =>
  router({
    method: "use",
    path: path
  });

export const all = path =>
  router({
    method: "all",
    path: path
  });
