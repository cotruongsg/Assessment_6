### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

  Callback function: it will be passed as a argument inside another function that be called when the asynchronous code in JavaScript completed.

- What is a Promise?

  A Promise is a fundamental concept in JavaScript used for handling asynchronous operations. It represents a value that may not be available yet but will resolve or reject at some point in the future. 
  A Promise can be in one of the following states:

    Pending: The initial state when the Promise is created, and the asynchronous operation is still in progress.
    Fulfilled (Resolved): The Promise has successfully resolved with a value.
    Rejected: The Promise encountered an error or was rejected with a reason.

- What are the differences between an async function and a regular function?

  Async function will always return an promise object which can be used to handle the result of the function's execution or any errors that may occur. while a regular function returns a value or undefined and any errors must be handled using try-catch blocks or other error-handling techniques.
  An async function can use the await keyword to pause its execution until a promise is resolved or rejected, while a regular function executes synchronously.

- What is the difference between Node.js and Express.js?

  Node.js is a runtime environment and platform built on Chrome's V8 JavaScript engine. It allows you to run JavaScript code outside of the browser, on the server-side, enabling server-side scripting and backend development.

  Express.js is a web application framework built on top of Node.js. It provides a higher-level abstraction over the core Node.js modules, making it easier to build web applications and APIs with fewer lines of code and a more organized structure.
  Express.js adds features like routing, middleware support, and templating engines, which facilitate the development of server-side applications. It allows developers to define routes for handling different HTTP methods (GET, POST, PUT, DELETE) and provides middleware to process requests before they reach the route handlers.

- What is the error-first callback pattern?

  The error-first callback pattern, also known as the Node.js callback pattern, is a convention used in Node.js and many JavaScript libraries to handle asynchronous operations that may result in errors. This pattern is commonly used with functions that perform I/O operations, such as reading from a file, making network requests, or querying a database, where errors can occur.

- What is middleware?

  In the context of web development, middleware refers to a software component or function that sits between the incoming HTTP request and the outgoing HTTP response in a web application's request-response cycle. It plays a crucial role in enhancing the functionality and flexibility of web servers and frameworks by providing a way to handle common tasks, modify requests or responses, and add additional functionality to the application.

- What does the `next` function do?

  In web development frameworks like Express.js, the next function is a callback function used to pass control from one middleware function to the next middleware function in the request-response cycle. When a middleware function is finished processing a request, it calls the next() function to hand over control to the next middleware or the final route handler. The next function is a critical part of how middleware works, as it allows you to chain multiple middleware functions together, each handling a specific aspect of the request or response

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```

  Performance Issue:
    The code is using await sequentially for each API call, which means the requests are executed one after the other, causing unnecessary delays. This results in poor performance and increased response time, especially when fetching data from multiple APIs.
    The calls to the GitHub API for each user are not dependent on each other and can be executed in parallel.

  Structure and Code Reusability:
    The function is hardcoded to fetch data for specific users (Elie, Joel, and Matt). It would be more flexible and reusable if you could pass an array of usernames or user IDs to fetch data for any arbitrary set of users.

  Naming:
    The variable names elie, joel, and matt do not provide much context about the data they hold. Using more descriptive names would improve the code's readability.

  we can fix as :

    const axios = require('axios');

    async function getUsers(usernames) {
      const userPromises = usernames.map((username) => {
        return fetch(`https://api.github.com/users/${username}`)
          .then((response) => response.json())
          .catch((error) => {
            // Handle API request error appropriately, e.g., log and return a default value
            console.error(`Error fetching data for ${username}:`, error);
            return null;
          });
      });

      const users = await Promise.all(userPromises);
      return users.filter((user) => user !== null);
    }

    // Example usage:
    const usernames = ['elie', 'joelburton', 'mmmaaatttttt'];
    getUsers(usernames)
      .then((users) => {
        console.log(users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
