import { LitElement, html, css } from "lit";

export class LoadingSpinner extends LitElement {
  static styles = css`
    .bg-spinner {
      width: 100%;
      height: 100%;
      background: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .spinner {
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-left-color: #000;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `;

  render() {
    return html`<section class="bg-spinner">
      <div class="spinner"></div>
      <p>Cargando pokemones...</p>
    </section> `;
  }
}

customElements.define("loading-spinner", LoadingSpinner);
