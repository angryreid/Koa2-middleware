function m1(ctx) {
  global.console.log("m1 middleware:");
}

module.exports = function() {
  return async function(ctx, next) {
    global.console.log('m1 start')
    m1(ctx);
    await next(); // 下一个中间件处理
    global.console.log('m1 end')
  };
};
