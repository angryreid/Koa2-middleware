function makeIterator(arr) {
  let nextIndex = 0;
  return {
    next: () => {
      if (nextIndex < arr.length) {
        let value = arr[nextIndex];
        let done = false;
        nextIndex++;
        return { value, done };
      } else {
        return { done: true };
      }
    }
  };
}

const it = makeIterator(["eat", "sleep", "guitar"]);

console.log("1", it.next());
console.log("2", it.next());
console.log("3", it.next());
console.log("4", it.next());
console.log("5", it.next());
