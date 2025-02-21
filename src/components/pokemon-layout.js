import { LitElement, html, css } from 'lit';

export class PokemonLayout extends LitElement {
    static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: Arial, sans-serif;
    }

    header {
      background-color: #ffcc00;
      color: white;
      padding: 16px;
      text-align: center;
      font-size: 4rem;
      font-weight: bold;
      border-bottom: 4px solid #ff6600;
    }

    main {
      flex-grow: 1; 
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    footer {
      background-color: #ffcc00;
      color: #000;
      padding: 10px;
      text-align: center;
      font-size: 14px;
      border-top: 2px solid #ff6600;
    }
  `;

  render() {
    return html`
      <header>Pokedex</header>
      <main>
        <slot></slot>
      </main>
      <footer>&copy; Maded by Cristian Camilo Betancourt.</footer>
    `;
  }
}

customElements.define('pokemon-layout', PokemonLayout);