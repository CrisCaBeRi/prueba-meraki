import { LitElement, html, css } from "lit";

export class ModalBox extends LitElement {
  static styles = css`
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
    }
    button {
      margin: 5px;
      padding: 10px 15px;
      background: #ffcc00;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 5px;
    }
    button:hover {
      background: #ff9900;
    }
  `;

  static get properties() {
    return {
      open: { type: Boolean },
      title: { type: String },
      message: { type: String },
    };
  }

  constructor() {
    super();
    this.open = false;
    this.title = '';
    this.message = '';
  }

  render() {
    return this.open
      ? html`
          <div class="modal">
            <div class="modal-content">
              <h3>${this.title}</h3>
              <p>${this.message}</p>
              <button @click="${this._handleConfirm}">Sí</button>
              <button @click="${this._handleClose}">No</button>
            </div>
          </div>
        `
      : '';
  }

  _handleConfirm() {
    this.dispatchEvent(new CustomEvent('confirm', { bubbles: true, composed: true }));
    this.open = false;
  }

  _handleClose() {
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
    this.open = false;
  }
}

customElements.define("modal-box", ModalBox);
