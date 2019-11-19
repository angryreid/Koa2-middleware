setImmediate(() => {
  console.log("[阶段3.immediate] immediate 回调 1");
});

setImmediate(() => {
  console.log("[阶段3.immediate] immediate 回调 2");
});

setImmediate(() => {
  console.log("[阶段3.immediate] immediate 回调 3");
});

setTimeout(()=>{
  console.log('[阶段1...定时器] 定时器 回调 1');
},0)