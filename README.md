# lisp-highlight

A minimal, lightweight syntax highlighter for Lisp code designed for web environments.

[**View Live Demo**](https://hwahyeon.github.io/lisp-highlight/)

## Features

- Highlights parentheses, special forms, built-in functions, strings, numbers, and comments
- Supports Common Lisp and Scheme syntax (character literals, booleans, quote shorthands, keywords)
- Lightweight and dependency-free
- Suitable for browser environments (ES Module)
- Optional automatic CSS injection

## Installation

### Using npm registry

```bash
npm install lisp-highlight
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
  .comment   { color: gray; font-style: italic; }
  .paren     { color: green; font-weight: bold; }
  .string    { color: red; }
  .number    { color: purple; font-weight: bold; }
  .special   { color: blue; font-weight: bold; }
  .function  { color: teal; font-weight: bold; }
  .keyword   { color: royalblue; }
  .literal   { color: crimson; font-weight: bold; }
  .character { color: darkorange; font-weight: bold; }
  .quote     { color: orchid; font-weight: bold; }
  .variable.global   { color: orange; font-style: italic; }
  .variable.constant { color: saddlebrown; font-weight: bold; }
</style>
```

Or use an external CSS file:

```html
<link rel="stylesheet" href="highlight.css" />
```


## Supported Highlighting

| Class | Description | Example |
|---|---|---|
| `.comment` | Line and block comments | `; comment`, `#\| block \|#` |
| `.paren` | Parentheses | `(`, `)` |
| `.string` | String literals | `"hello"` |
| `.number.integer` | Integer numbers | `42`, `-7` |
| `.number.float` | Floating point numbers | `3.14` |
| `.number.ratio` | Rational numbers | `1/3` |
| `.number.hex` | Hexadecimal numbers | `#xFF` |
| `.number.binary` | Binary numbers | `#b1010` |
| `.special` | Special forms | `define`, `lambda`, `if`, `let`, `loop`, ... |
| `.function` | Built-in functions | `car`, `mapcar`, `format`, ... |
| `.keyword` | Keyword symbols | `:test`, `:key`, `:start`, ... |
| `.literal` | Boolean and nil literals | `t`, `nil`, `#t`, `#f` |
| `.character` | Character literals | `#\a`, `#\space`, `#\newline` |
| `.quote` | Quote shorthands | `'`, `` ` ``, `,`, `,@`, `#'` |
| `.variable.global` | Global variables | `*standard-output*` |
| `.variable.constant` | Constants | `+pi+` |
