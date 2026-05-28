let stylesInjected = false;

/**
 * Injects default CSS styles into the document head. Runs only once.
 * Does nothing in non-browser environments.
 */
export function injectStyles() {
  if (stylesInjected || typeof document === "undefined") return;

  const style = document.createElement("style");
  style.textContent = `
    .comment {
      color: #6A9955;
      font-style: italic;
    }
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
    .literal {
      color: #F44336;
      font-weight: bold;
    }
    .character {
      color: #E65100;
      font-weight: bold;
    }
  `;
  document.head.appendChild(style);
  stylesInjected = true;
}
