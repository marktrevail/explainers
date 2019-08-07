// ==================================================================================================
// PROBLEM WITH "THIS"
// ==================================================================================================

// ----------------------------------------------------------------------------------------
// When everything is fine 
// ----------------------------------------------------------------------------------------

class Human {

  constructor(name, height) {
    this.name = name;
    this.height = height;
  };

  logHeight() {
    console.log(`${this.name}'s height is: ${this.height}`);
  };
};

var john = new Human("John", 180);
john.logHeight();   // John's height is 180 
                            // CORRECT as the logHeight function is being called with John as
                            // the context (context is "what's to the left" of the function being called)
                            // so "this" in the logHeight function refers to John

// ----------------------------------------------------------------------------------------
// Problem - Calling the logHeight() function in a different context
// ----------------------------------------------------------------------------------------

// E.g. We want to run the logHeight function when we press a BUTTON

var mary = new Human("Mary", 165);

// Pass the logHeight function to a button 
document.getElementById("btn-get-size-human").addEventListener("click", mary.logHeight); // 's height is: undefined
                                                                  // INCORRECT as the "this" in logHeight now
                                                                  // refers to the button (not the mary object)
                                                                  
// ----------------------------------------------------------------------------------------
// Solution 1: self = this
// ----------------------------------------------------------------------------------------

class Dog {

  constructor(name, height) {
    self = this;    // When creating the object, assign the object permanently to a variable (called "self" in this case, could be anything) (NB: needs to be in the constructor)
    this.name = name;
    this.height = height;
  };


  logHeight() {
    console.log(`${self.name}'s height is: ${self.height}`);   // Use "self" here instead of "this"
  };
};

var roger = new Dog("Roger", 80);
document.getElementById("btn-get-size-dog").addEventListener("click", roger.logHeight); // Roger's height is: 80
                                                                                        // CORRECT!

// ----------------------------------------------------------------------------------------
// Solution 2: Bind
// ----------------------------------------------------------------------------------------

class Cat {

  constructor(name, height) {
    this.name = name;
    this.height = height;
    this.logHeight = this.logHeight.bind(this)   // When using someCat.logHeight, it's always "bound" to the someCat object
  };

  logHeight() {
    console.log(`${this.name}'s height is: ${this.height}`);
  };
};

var millie = new Cat("Millie", 40);
document.getElementById("btn-get-size-cat").addEventListener("click", millie.logHeight); // Millie's height is: 40
                                                                                         // CORRECT!

// ----------------------------------------------------------------------------------------
// Solution 3: Arrow functions
// ----------------------------------------------------------------------------------------

class Fish {

  constructor(name, height) {
    this.name = name;
    this.height = height;
  };

  logHeight = () => {      // Use an arrow function instead - arrow functions within classes always have the context of their class instance 
    console.log(`${this.name}'s height is: ${this.height}`);
  }
};

var fishy = new Fish("Fishy", 10);
document.getElementById("btn-get-size-fish").addEventListener("click", fishy.logHeight); // Fishy's height is: 10
                                                                                         // CORRECT!