"use strict";

function makeIterator(arr) {
  var nextIndex = 0;
  return {
    next: function next() {
      if (nextIndex < arr.length) {
        var value = arr[nextIndex];
        var done = false;
        nextIndex++;
        return { value: value, done: done };
      } else {
        return { done: true };
      }
    }
  };
}

var it = makeIterator(["eat", "sleep", "guitar"]);

console.log("1", it.next());
console.log("2", it.next());
console.log("3", it.next());
console.log("4", it.next());
console.log("5", it.next());
//# sourceMappingURL=iterator.js.map