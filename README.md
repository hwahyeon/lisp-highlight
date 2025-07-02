# lisp-highlight

A minimal, lightweight syntax highlighter for Lisp code designed for web environments.

[**View Live Demo**](https://hwahyeon.github.io/lisp-highlight/)

## Features

- Highlights parentheses, keywords, strings, and numbers
- Lightweight and dependency-free
- Suitable for browser environments (ES Module)
- Optional automatic CSS injection

## Installation

Using GitHub Packages:

```bash
npm install @hwahyeon/lisp-highlight
```

## Usage

```js
import { highlightLisp } from "./lisp-highlight.js"; // Adjust path as needed

const code = "(define (square x) (* x x))";
const html = highlightLisp(code);
document.getElementById("output").innerHTML = html;
```

## Styling Behavior

By default, CSS styles are automatically injected into the document:

```js
highlightLisp(code); // Automatic styles applied
```

You can disable this and provide your own styles:

```js
highlightLisp(code, { injectStyles: false });
```

In that case, define CSS manually:

```html
<style>
  .paren {
    color: green;
  }
  .string {
    color: orange;
  }
  .number {
    color: purple;
    font-weight: bold;
  }
  .keyword {
    color: blue;
    font-weight: bold;
    text-decoration: underline;
  }
</style>
```

Or use an external CSS file:

```html
<link rel="stylesheet" href="highlight.css" />
```

**Note:** This library does not insert inline styles automatically. It generates `<span>` elements with class names (`paren`, `string`, `number`, `keyword`) which you can style as needed.

## Supported Highlighting

- `(` `)` highlighted as parentheses
- `"strings"` string highlighting
- Numbers like `123`, `3.14` number highlighting
- Keywords: `define`, `lambda`, `if`, `else`, `cond`, `let`, `begin`
