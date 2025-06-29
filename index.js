let stylesInjected = false;

/**
 * Injects default CSS styles into the document head. Runs only once.
 * Does nothing in non-browser environments.
 */
function injectStyles() {
  if (stylesInjected || typeof document === 'undefined') return;

  const style = document.createElement('style');
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
      text-decoration: underline;
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

  if (typeof code !== 'string') return '';

  const tokens = code.match(/"[^"]*"|\b\d+(\.\d+)?\b|\b(define|lambda|if|else|cond|let|begin)\b|[\(\)]|\s+|[^\s()"]+/g);

  if (!tokens) return '';

  return tokens.map(token => {
    if (token === '(' || token === ')') return `<span class="paren">${token}</span>`;
    if (/^"[^"]*"$/.test(token)) return `<span class="string">${token}</span>`;
    if (/^\d+(\.\d+)?$/.test(token)) return `<span class="number">${token}</span>`;
    if (/^(define|lambda|if|else|cond|let|begin)$/.test(token)) return `<span class="keyword">${token}</span>`;
    return token;
  }).join('');
}
