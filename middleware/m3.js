function m3(ctx) {
  global.console.log("m3 middleware:");
}

module.exports = function() {
  return async function(ctx, next) {
    global.console.log('m3 start')
    m3(ctx);
    await next(); // 下一个中间件处理
    global.console.log('m3 end')
  };
};
