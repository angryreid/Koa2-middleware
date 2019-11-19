const { readFile } = require("fs");
const EventEmitter = require("events");

class MyEvent extends EventEmitter {}

const myEvent = new MyEvent();

myEvent.on('event', () => {
  console.log("myEvent 执行了");
})


setTimeout(()=>{
  console.log('0 毫秒后到期执行回调函数');
}, 0);

setTimeout(()=>{
  console.log('100 毫秒后到期执行回调函数');
}, 100);

setTimeout(()=>{
  console.log('200 毫秒后到期执行回调函数');
}, 200);

readFile('../package.json', 'utf-8', data => {
  console.log('读取文件1，package.json 完成。');
});

readFile('../README.md', 'utf-8', data => {
  console.log('读取文件2，README.md 完成。');
});

setImmediate(() => {
  console.log("immediate 执行了");
});

process.nextTick(()=> {
  console.log("process.nextTick 的第 1 次回调");
})

Promise.resolve()
.then(()=>{
  myEvent.emit('event');
  process.nextTick(() => {
    console.log("process.nextTick 的第 2 次回调");
  })
  console.log('Promise 的第 1 次回调 ');
})
.then(()=>{
  console.log('Promise 的第 2 次回调 ');
})
.then(()=>{
  console.log('Promise 的第 3 次回调 ');
})
.then(()=>{
  console.log('Promise 的第 4 次回调 ');
})