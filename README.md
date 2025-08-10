# lisp-highlight

A minimal, lightweight syntax highlighter for Lisp code designed for web environments.

[**View Live Demo**](https://hwahyeon.github.io/lisp-highlight/)

## Features

- Highlights parentheses, keywords, strings, and numbers
- Lightweight and dependency-free
- Suitable for browser environments (ES Module)
- Optional automatic CSS injection

## Installation

### Using npm registry

```bash
npm install lisp-highlight
```

### Using GitHub Packages

To use GitHub Packages, you need an `.npmrc` file in your project root directory.

1. **Location of `.npmrc`**

   - Create the `.npmrc` file in your project root (where `package.json` is located).
   - If you prefer a global configuration, you can create it in your home directory (`~/.npmrc`).

2. **Example `.npmrc` content**

```ini
@hwahyeon:registry=https://npm.pkg.github.com/
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_TOKEN
```

3. **How to generate a token**

   - Go to your GitHub account settings → [Developer settings → Personal access tokens](https://github.com/settings/tokens) → **"Tokens (classic)"**
   - The token must have at least **`read:packages`** permission.
   - Replace `YOUR_GITHUB_TOKEN` in the `.npmrc` file with the generated token.

4. **Install the package**

```bash
npm install @hwahyeon/lisp-highlight
```

> Note: When using GitHub Packages, add `.npmrc` to your `.gitignore` file to prevent exposing your token publicly.

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
