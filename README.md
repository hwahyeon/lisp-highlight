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
npm install @your-username/lisp-highlight
```

## Usage

Example for browser-based projects:

```js
import { highlightLisp } from './lisp-highlight.js'; // Adjust path as needed

const code = '(define (square x) (* x x))';
const html = highlightLisp(code);
document.getElementById('output').innerHTML = html;
```

Optionally disable automatic style injection:

```js
highlightLisp(code, { injectStyles: false });
```

## Supported Highlighting

- `(` `)` highlighted as parentheses
- `"strings"` string highlighting
- Numbers like `123`, `3.14` number highlighting
- Keywords: `define`, `lambda`, `if`, `else`, `cond`, `let`, `begin`

## Styling

By default, basic CSS styles are injected automatically. You can override them or disable injection using:

```js
highlightLisp(code, { injectStyles: false });
```

In that case, apply your own CSS for:

- `.paren`
- `.string`
- `.number`
- `.keyword`
