import { LitElement, html, css } from "lit";

export class ErrorMessage extends LitElement {
  static get properties() {
    return {
      message: { type: String },
    };
  }

  static styles = css`
    .error-bg {
      width: 100%;
      height: 100%;
      background: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .error {
      color: red;
      font-weight: bold;
      padding: 10px;
      background: #ffe6e6;
      border: 1px solid red;
      border-radius: 5px;
    }
  `;

  render() {
    return html`<section class="error-bg">
      <div class="error">${this.message}</div>
    </section> `;
  }
}

customElements.define("error-message", ErrorMessage);
