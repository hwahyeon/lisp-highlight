import { injectStyles } from "./styles.js";

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
    /#\|[\s\S]*?\|#|;[^\n]*|"(?:[^"\\]|\\.)*"|[+-]?\d+\/\d+|[+-]?(\d*\.\d+|\d+\.\d*)|\b(define|lambda|if|else|cond|let|begin)\b|[()]|\s+|[^\s()"]+/g
  );

  if (!tokens) return "";

  const specialForms = new Set([
    'define', 'let', 'let*', 'lambda', 'defun', 'defparameter', 'defvar', 'setq', 'setf',
    'quote', 'function', 'progn', 'if', 'else', 'cond', 'begin', 'loop', 'block', 'return-from',
    'go', 'catch', 'throw', 'unwind-protect', 'tagbody', 'eval-when'
  ]);

  const knownFunctions = new Set([
    'mapcar', 'format', 'find', 'find-if', 'reduce', 'remove', 'append',
    'concatenate', 'list', 'length', 'member', 'assoc', 'apply', 'funcall',
    'cons', 'car', 'cdr', 'nth', 'nthcdr', 'every', 'some', 'equal',
  ]);

  const knownKeywords = new Set([
    ':test', ':key', ':start', ':end', ':name', ':direction', ':initial-element',
    ':initial-contents', ':element-type', ':allow-other-keys', ':external', ':internal'
  ]);

  return tokens
    .map((token) => {
      const trimmed = token.trim();
      const escaped = escapeHtml(token);

      if (/^;/.test(token) || /^#\|/.test(token))
        return `<span class="comment">${escaped}</span>`;

      if (token === "(" || token === ")")
        return `<span class="paren">${escaped}</span>`;
      if (/^"(?:[^"\\]|\\.)*"$/.test(token))
        return `<span class="string">${escaped}</span>`;

      if (/^#b[01]+$/i.test(trimmed))
        return `<span class="number binary">${escaped}</span>`;
      if (/^#x[\da-f]+$/i.test(trimmed))
        return `<span class="number hex">${escaped}</span>`;
      if (/^[+-]?\d+\/\d+$/.test(trimmed))
        return `<span class="number ratio">${escaped}</span>`;
      if (/^[+-]?(\d*\.\d+|\d+\.\d*)$/.test(trimmed))
        return `<span class="number float">${escaped}</span>`;
      if (/^[+-]?\d+$/.test(trimmed))
        return `<span class="number integer">${escaped}</span>`;

      if (/^\*\w[\w-]*\*$/.test(trimmed))
        return `<span class="variable global">${escaped}</span>`;
      if (/^\+\w[\w-]*\+$/.test(trimmed))
        return `<span class="variable constant">${escaped}</span>`;

      if (/^:\w[\w-]*$/.test(trimmed)) {
        if (knownKeywords.has(trimmed)) {
          return `<span class="keyword known">${escaped}</span>`;
        }
        return `<span class="keyword">${escaped}</span>`;
      }

      if (trimmed === 't' || trimmed === 'nil' || trimmed === '#t' || trimmed === '#f')
        return `<span class="literal">${escaped}</span>`;

      if (specialForms.has(trimmed)) {
        return `<span class="special">${escaped}</span>`;
      }

      if (knownFunctions.has(trimmed)) {
        return `<span class="function">${escaped}</span>`;
      }

      return escaped;
    })
    .join("");
}
