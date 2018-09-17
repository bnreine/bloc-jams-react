#### Questions

1. An alternative approach to state management is to use a portable state container like Redux. Read the [Motivation](https://redux.js.org/introduction/motivation) section of Redux's documentation. In your checkpoint submission, explain the pros and cons of Redux.


Pros...
  * Makes state mutations predictable
  * Single source of truth (universal app easy, easy to debug since there's only one source of truth)
  * State is read only (can only change state by submitting an action to the store. Action is an intention.  All intentions are carried out in a particular order, therefore no race conditions)
  * Make changes with "pure" functions (reducers combine accumulation-state with add-on-action to create new state.  Reducer functions don't change input and give same output for same input, no state mutations, only updates, can track all changes over time, can control order in which you call reducers, and therefore control data flow and updates)
  * apps behave consistently
  * can run in diff environemtns (client, server, native)
  * easy to test
  * great dev experience (live code editing and time traveling debugger)
  * separates concerns so that they don't interfere with each other (store, actions, and reducers)
  * good for large apps with lots of data cross flow between lots of componetns



Cons...
  * Need lots of extra code
  * takes more time to make app
  * uses more memory to create copies of State
  * more difficult if there's other places that important state lives
  * need to do certain things in a certain way (rigid architecture)
  * too much code for small apps if there's not a lot of cross talk between the few components that you have


2. Implement the last three acceptance criteria:
  * When I hover over a song, it displays a "play" button in place of the song number.
  * The currently playing song displays a "pause" button in place of the song number.
  * A paused song displays a "play" button in place of the song number.

  Tips:
  * Use `<span>` tags to include play and pause icons in your song list table. To include icons in your site, add [Ionicons](https://ionicons.com/) to your project. Add a `<link>` tag to the head of `public/index.html` that uses the CDN link at the bottom of the Ionicons website. Don't forget to include `rel="stylesheet" type="text/css"` in your `<link>`.
  * You add Ionicons by assigning the icon name to the `class` attribute of an HTML tag. Remember in React to use `className` instead of `class`, ie `<span className="ion-play"></span>` .
  * You can use the JavaScript events `onMouseEnter` and `onMouseLeave` to trigger the hover events.
