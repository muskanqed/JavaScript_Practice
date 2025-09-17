const promise = new Promise((resolve, reject) => {
    console.log(1);
    setTimeout(() => {
        console.log("timerStart");
        resolve("success");
        console.log("timerEnd");
    }, 0);
    console.log(2);
});

promise.then((res) => {
    console.log(res);
});

console.log(4);

// Output
// 1
// 2
// 4
// timerStart
// timerEnd
// success

// Explaination

// 1  // synchronous - inside promise constructor
// 2  // synchronous - inside promise constructor
// 4  // synchronous - outside promise
// timerStart  // async - macrotask
// timerEnd    // still inside macrotask
// success     // async - microtask after macrotask

// | Line                 | Type              | When it runs    |
// | -------------------- | ----------------- | --------------- |
// | `new Promise(...)`   | synchronous       | immediately     |
// | `.then(...)`         | async (microtask) | after resolve   |
// | `setTimeout(..., 0)` | async (macrotask) | after sync work |
// | `console.log(4)`     | synchronous       | immediately     |
