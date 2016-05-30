// http://stackoverflow.com/questions/111102/how-do-javascript-closures-work
/*
Two one sentence summaries:

a closure is the local variable for a function — kept alive after the function has returned, or
a closure is a stack-frame which is not deallocated when the function returns (as if a 'stack-frame' were malloc'ed instead of being on the stack!).
*/

//Example #1 
function sayHello2(name) {
    var text = 'Hello ' + name; // Local variable
    var say = function () { console.log(text); };
    return say;
}
var say2 = sayHello2('Bob');
say2(); // logs "Hello Bob"


// Notes : 
/*
In JavaScript, if you declare a function within another function, then the local variables can remain accessible after returning from the function you called. This is demonstrated above, because we call the function say2() after we have returned from sayHello2(). Notice that the code that we call references the variable text, which was a local variable of the function sayHello2().

The magic is that in JavaScript a function reference also has a secret reference to the closure it was created in — similar to how delegates are a method pointer plus a secret reference to an object.
*/

//============================================================================================================================================
//Example #2
/*
This example shows that the local variables are not copied — they are kept by reference. It is kind of like keeping a stack-frame in memory when the outer function exits!
*/
function say667() {
    // Local variable that ends up within closure
    var num = 666;
    var say = function () { console.log(num); };
    num++;

    return say;
}

var sayNumber = say667();
sayNumber(); // logs 667

//============================================================================================================================================
//Example #3
/*
All three global functions have a common reference to the same closure because they are all declared within a single call to setupSomeGlobals().
*/

var gLogNumber, gIncreaseNumber, gSetNumber;
function setupSomeGlobals() {
    // Local variable that ends up within closure
    var num = 666;
    // Store some references to functions as global variables
    gLogNumber = function () { console.log(num); };
    gIncreaseNumber = function () { num++; };
    gSetNumber = function (x) { num = x; };
}

setupSomeGlobals();
gIncreaseNumber();
gLogNumber(); // 667
gSetNumber(5);
gLogNumber(); // 5

var oldLog = gLogNumber;

setupSomeGlobals();
gLogNumber(); // 666

oldLog(); // 5
/*
Note 
The three functions have shared access to the same closure — the local variables of setupSomeGlobals() when the three functions were defined.

Note that in the above example, if you call setupSomeGlobals() again, then a new closure (stack-frame!) is created. The old gLogNumber, gIncreaseNumber, gSetNumber variables are overwritten with new functions that have the new closure. (In JavaScript, whenever you declare a function inside another function, the inside function(s) is/are recreated again each time the outside function is called.)
*/

