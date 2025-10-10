let stylesInjected = false;

/**
 * Injects default CSS styles into the document head. Runs only once.
 * Does nothing in non-browser environments.
 */
function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;

  const style = document.createElement("style");
  style.textContent = `
    .paren {
      color: #4CAF50;
      font-weight: bold;
    }
    .string {
      color: #E91E63;
    }
    .number {
      color: #9C27B0;
      font-weight: bold;
    }
    .keyword {
      color: #2196F3;
      font-weight: bold;
    }
    .number.integer {
      color: #9C27B0;
    }
    .number.float {
      color: #7B1FA2;
    }
    .number.ratio {
      color: #00897B;
    }
    .number.hex {
      color: #512DA8;
    }
    .number.binary {
      color: #303F9F;
    }
    .variable.global {
      color: #FF9800;
      font-style: italic;
    }
    .variable.constant {
      color: #795548;
      font-weight: bold;
    }
    .keyword.known {
      color: #FF9800;
      font-weight: bold;
    }
    .special {
      color: #3F51B5;
      font-weight: bold;
      font-style: italic;
    }
    .function {
      color: #009688;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);
  stylesInjected = true;
}

/**
 * Highlights Lisp code by adding HTML span tags for syntax elements.
 *
 * @param {string} code - Raw Lisp code to highlight.
 * @param {Object} [options] - Optional configuration.
 * @param {boolean} [options.injectStyles=true] - Whether to automatically inject default CSS styles.
 * @returns {string} HTML string with syntax highlighting applied.
 */
export function highlightLisp(code, options = {}) {
  const { injectStyles: shouldInject = true } = options;

  if (shouldInject) injectStyles();

  if (typeof code !== "string") return "";

  const tokens = code.match(
    /"[^"]*"|[+-]?\d+\/\d+|[+-]?(\d*\.\d+|\d+\.\d*)|\b(define|lambda|if|else|cond|let|begin)\b|[()]|\s+|[^\s()"]+/g
  );

  if (!tokens) return "";

  const specialForms = new Set([
    'let', 'let*', 'lambda', 'defun', 'defparameter', 'defvar', 'setq', 'setf',
    'quote', 'function', 'progn', 'if', 'cond', 'loop', 'block', 'return-from',
    'go', 'catch', 'throw', 'unwind-protect', 'tagbody', 'eval-when'
  ]);

  const knownFunctions = new Set([
    'mapcar', 'format', 'find', 'find-if', 'reduce', 'remove', 'append',
    'concatenate', 'list', 'length', 'member', 'assoc', 'apply', 'funcall',
    'cons', 'car', 'cdr', 'nth', 'nthcdr', 'every', 'some', 'equal',
  ]);

  return tokens
    .map((token) => {
      const trimmed = token.trim();
      const knownKeywords = new Set([
        ':test', ':key', ':start', ':end', ':name', ':direction', ':initial-element',
        ':initial-contents', ':element-type', ':allow-other-keys', ':external', ':internal'
      ]);

      if (token === "(" || token === ")")
        return `<span class="paren">${token}</span>`;
      if (/^"[^"]*"$/.test(token))
        return `<span class="string">${token}</span>`;

      if (/^#b[01]+$/i.test(token))
        return `<span class="number binary">${token}</span>`;
      if (/^#x[\da-f]+$/i.test(token))
        return `<span class="number hex">${token}</span>`;
      if (/^[+-]?\d+\/\d+$/.test(token))
        return `<span class="number ratio">${token}</span>`;
      if (/^[+-]?(\d*\.\d+|\d+\.\d*)$/.test(token))
        return `<span class="number float">${token}</span>`;
      if (/^[+-]?\d+$/.test(token))
        return `<span class="number integer">${token}</span>`;

      if (/^\*\w[\w-]*\*$/.test(trimmed))
        return `<span class="variable global">${token}</span>`;
      if (/^\+\w[\w-]*\+$/.test(trimmed))
        return `<span class="variable constant">${token}</span>`;

      if (/^:\w[\w-]*$/.test(token)) {
        if (knownKeywords.has(token)) {
          return `<span class="keyword known">${token}</span>`;
        }
        return `<span class="keyword">${token}</span>`;
      }

      if (specialForms.has(trimmed)) {
        return `<span class="special">${token}</span>`;
      }

      if (knownFunctions.has(trimmed)) {
        return `<span class="function">${token}</span>`;
      }

      return token;
    })
    .join("");
}
