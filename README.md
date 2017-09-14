# HookahJS

<img src="https://www.muicss.com/static/images/hookahjs.svg" width="250px">

HookahJS is a tiny JS library that monitors all `<input>` and `<textarea>` elements on your page and adds `empty/dirty/touched` CSS hooks in response to user interactions with the element.

## Introduction

HookahJS is a tiny JS library that monitors all `<input>` and `<textarea>` elements on your page and adds the following CSS classes in response to user interactions with the element:

  * `hkjs--empty` - control element is empty
  * `hkjs--not-empty` - control element is not empty
  * `hkjs--pristine` - control element has seen an `input` or `change` event
  * `hkjs--dirty` - control element has not seen an `input` or `change` event
  * `hkjs--touched` - control element has seen a `blur` event
  * `hkjs--untouched` - control element has not seen a `blur` event

HookahJS is 979 bytes (minified + gzipped).

## Quickstart

To use HookahJS you only need to add `hookah.js` to your page and the library will automatically add event listeners to all current and future `<input>` and `<textarea>` elements. The following example will draw a red box around an invalid input box after the user has touched the element:

```html
<html>
  <head>
    <script src="//cdn.rawgit.com/muicss/hookahjs/0.0.1/dist/hookah.min.js"></script>
    <style>
      .hkjs--touched:not(:valid) {
        border: 1px solid red;
      }
    </style>
  </head>
  <body>
    <input type="email" required>
  </body>
</html>
```

## Browser Support

 * IE10+
 * Opera 12+
 * Safari 5+
 * Chrome
 * Firefox
 * iOS 6+
 * Android 4.4+

Note: HookahJS will support IE8+ for dynamic DOM elements initialized explicitly (with `hkjs.init()`).

## Documentation

### How to load HookahJS

For production systems we recommend that you host the library file yourself which you can download from the `dist/` directory in this repository:

 * [hookah.js](https://cdn.rawgit.com/muicss/hookahjs/0.0.1/dist/hookah.js)
 * [hookah.min.js](https://cdn.rawgit.com/muicss/hookahjs/0.0.1/dist/hookah.min.js)

For tighter integration with your code you can also use the HookahJS NPM package: 

```bash
$ npm install --save hookahjs
```

```javascript
var hkjs = require('hookahjs');

document.addEventListener('DOMContentLoaded', function() {
  hkjs.init();
});
```

Note that if you initialize HookahJS after the `DOMContentLoaded` event fires, there may be a flash of unstyled content. To avoid this you can seed your page with `.hkjs--empty`/`.hkjs--not-empty` classes as necessary.

### How to add HookahJS support selectively

By default, HookahJS will add event listeners to all current and future `<input>` and `<textarea>` elements. To prevent this behavior you can listen to the `hkjs-load` event and call the `preventDefault()` method on the event object. You can also use the `hkjs` global object to add hooks to individual elements:

```javascript
window.addEventListener('hkjs-init', function(ev) {
  // prevent HookahJS from adding hooks to all <input> and <textarea> elements
  ev.preventDefault();

  // use the `hkjs` global object to add hooks to elements manually
  var inputEl = document.getElementById('my-input-element');
  hkjs.init(inputEl);
});
```

### How to handle programmatic changes to elements

HookahJS can detect all `change` and `input` events triggered by user interactions but it can't detect programmatic changes to control elements. To update the HookahJS CSS classes after making a programmatic change to a control element, you can trigger a `change` or `input` event on the element:

```javascript
// modify element
var inputEl = document.getElementById('my-input-element');
inputEl.value = 'Programmatic input';

// initialize event object (with bubbles = false)
var ev = document.createEvent('HTMLEvents');
ev.initEvent('change', false);

// trigger event
inputEl.dispatchEvent(ev);
```