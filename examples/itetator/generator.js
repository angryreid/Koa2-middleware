function* makeIterator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}


const gen = makeIterator(["eat", "sleep","guitar"]);

console.log("1", gen.next().value);
console.log("2", gen.next().value);
console.log("3", gen.next().value);
console.log("4", gen.next().value);
console.log("5", gen.next().value);
console.log("6", gen.next().done);