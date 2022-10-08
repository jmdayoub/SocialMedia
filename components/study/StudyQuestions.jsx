import React from "react";

function InterviewPrep() {
  return <h1>Interview Prep</h1>;

  // Interview Prep

  // What is React?
  // React is a declarative, efficient, and flexible JavaScript library for building user interfaces.  Lets you create complex user interfaces from small and isolated pieces of code called components.

  // What are the differences between ES5 and ES6 syntax in React?
  // Arrow functions were introduced in ES6 - Defining variables in ES5 was only done using the var keyword, whereas ES6 uses the let and const keywords
  // 3. We can use de-structuring and spread operators to manipulate objects more smoothly in ES6
  // 4. In ES6, we are able to import modules from other js/jsx files using the export and import keywords compared to ES5 require keyword.
  // 5. In ES6, we are introduced to template literals that allow us to perform string interpolation easily.

  // In calling setState, when would you pick one method of calling this function over the other?
  // 1. First method is to pass an object into setState
  // 2. Second method is in calling setState, you can pass an updater function instead.  The difference between these two is that passing a function allows you to
  //    access the current state value inside the updater.  Whenever we are trying to perform any expression or calculation that depends on the latest version of state,
  //    we should use setState with an updater function.

  // IS SETSTATE SYNCHRONOUS or ASYNCHRONOUS
  // setState is asynchronous, though it may act like it's synchronous.  When calling setState, React waits for all components to finish calling setState
  //  to then re-render components.  This boosts performance and reduces unneccessary re-renders.

  // LIST MAJOR ADVANTAGES OF REACT - It is component-based, which are essentially functions that return HTML(JSX).  They can be independent and re-used inside other components.
  //  - It utilizes virtual DOMs and updates that instead of the real DOM, updating only the changes found using its diff algorithm.  This increases performance.
  //  - It utilizes JSX, which is a syntax extension of the JavaScript language and are known as React elements.  It's essentially HTML but with the ability to use JavaScript expressions anywhere using curly braces, making it easier to read.

  // LIMITATIONS OF REACT - It is solely a UI library, not a framework like Angular or Vue
  // Most obvious limitation of React is that it is solely a UI library, not a framework such as Angular and Vue.
  // - Because it is not a framework, there are more steps that need to be taken to integrate it into a tradition MVC framework.

  //
}
export default InterviewPrep;
