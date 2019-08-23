function m1(ctx) {
  global.console.log("m1 middleware start !");
}

module.exports = function() {
  return async function(ctx, next) {
    m1(ctx);
    await next(); // 下一个中间件处理
    global.console.log('m1 end')
  };
};
