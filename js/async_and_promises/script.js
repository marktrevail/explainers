// ==========================================================================
// SYNC VS. ASYNC
// ==========================================================================

// ------------------------------------------------------
// Simple definitions
// ------------------------------------------------------

// A piece of JavaScript code is either "sync" or "async" 
// "Sync" (a.k.a. blocking)
// -- Means the code blocks the execution of the next piece of code, until it's finished
// -- Tends to be simple operations (all the simple building blocks - math operations, loops, declaring variables)
// -- Tends to be code that is fast to run - so it's fine that it all runs in order
// "Async" (a.k.a. non-blocking)
// -- Means the code DOESN'T block the execution of the next piece of code
// -- It gets "kicked off", then runs in parallel with whatever's next
// -- Typically operations that take a long time are made "async" - e.g. communicating with a database, reading a file

// Example with all sync code --------------

let i = 0;             // SYNC - blocks execution of next row
i++                    // SYNC
console.log(i);        // SYNC    // Output: 1   (not 0, not 2)
i++                    // SYNC

// Example with one line of Async code --------------

let j = 0;                        // SYNC
setTimeout(() =>{ j++ }, 1000);   // ASYNC  (waits 1 second then increments j by 1)
console.log(j);                   // SYNC    // Output: 0  - This gets run as soon as "setTimeout" has been kicked off (not finished)

// How to know if a piece of code runs synchronously, or asynchronously? Look in the documentation :)

// ==========================================================================
// PROMISES
// ==========================================================================

// A Promise is a neat way to wait for ASYNC code to run, THEN do something with the result

// A Promise is a special type of object that, once it gets kicked off, will eventually EITHER:
// -- Become "fulfiled" and return a *value* (if it works successfully)
// -- Become "rejected" and return a *reason* for failure

// Promises have special methods, then() and catch(), that know whether the promise has been resolved successfully or not:
// -- then() will run after the promise has been fulfilled, and get passed the *value* returned
// -- catch() will run after the promise has been rejected, and get passed the error *reason*


// ------------------------------------------------------------------
// Example of creating a Promise:
// ------------------------------------------------------------------

// Promises are declared using syntax "new Promise(executor)""
// -- This "executor" is a function, that has as parameters two MORE functions: resolve and reject
// -- These "resolve" and "reject" functions are special functions that do what they say on the tin:
//    ++ resolve(value) fulfils the promsie and passes on the value to any .then() handlers
//    ++ reject("reason") rejects the promsie and passes on the "reason" to any .catch() handler

var k = 0;          // SYNC   // Set up a global variable k with value 0

// Create the promise
var waitAndAdd1 = new Promise( (resolve, reject) => {
  if(3 === 4) {reject('Something bad has happened')}; // SYNC    // If 3 somehow equals 4, reject promise, return error reason
  setTimeout(() => { k++; resolve(k) }, 1000);           // ASYNC   // waits 1 second then increments k by 1, fulfils promise, returns this new value
});

// Call the promise, THEN log the value
waitAndAdd1                               // ASYNC - Kicks off first
.then((value) => {
  console.log(value);                     // Output: 1  (after 1 second)
});

console.log('Hello')  // Some other SYNC code  // Output:  Hello 

// NB the overall output from above example is:
//  Hello
//  1    (not 0! This outputs second since the execution carries on with the next piece of code once the async promise has been kicked off)
