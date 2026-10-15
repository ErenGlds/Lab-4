# Assignment 4 – Task Management Dashboard

This project is a task dashboard built with plain JavaScript. The files are organized by job: `index.html` holds the page structure, `styles.css` adds basic styling, `taskManager.js` contains the `Task` and `TaskManager` classes, `api.js` simulates a server request with a 1.5 second delay and `main.js` connects everything by loading tasks rendering them to the page and handling the Toggle and Delete buttons.

The biggest challenges were updating data without changing the original array, using `map`, `filter` and spread instead of `push` and `splice`, making the task `id` read-only with `Object.defineProperty` and understanding how `async/await` and `try/catch` work together when loading data. I also had to use a local server because ES modules don't load when opening the HTML file directly.
