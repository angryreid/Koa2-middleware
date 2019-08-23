function m2(ctx) {
  global.console.log("m2 middleware start !");
}

module.exports = function() {
  return async function(ctx, next) {
    m2(ctx);
    await next(); // 下一个中间件处理
    global.console.log('m2 end')
  };
};
