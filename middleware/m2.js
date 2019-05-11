function m2(ctx) {
  global.console.log("m2 middleware:");
}

module.exports = function() {
  return async function(ctx, next) {
    global.console.log('m2 start')
    m2(ctx);
    await next(); // 下一个中间件处理
    global.console.log('m2 end')
  };
};
