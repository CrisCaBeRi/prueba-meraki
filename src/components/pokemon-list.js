import { LitElement, html, css } from "lit";

export class PokemonList extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      max-width: 100%;
    }

    .pokemon-grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(250px, 1fr)
      ); /* Ajustado */
      gap: 16px;
      justify-content: center;
      padding: 0;
      margin: 0 auto;
      max-width: 800px; /* Para evitar que se estire en pantallas muy grandes */
      list-style: none;
    }

    .pokemon-card {
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      padding: 15px;
      text-align: center;
      cursor: pointer;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .pokemon-card:hover {
      transform: scale(1.05);
      border: 1px solid black;
    }

    img {
      width: 100px;
      height: auto;
      border-radius: 50%;
      background: white;
      padding: 5px;
    }

    .pokemon-name {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-top: 10px;
    }

    .pokemon-type {
      font-size: 14px;
      color: #444;
      background: rgba(255, 102, 0, 0.2);
      padding: 5px 10px;
      border-radius: 5px;
      margin-top: 5px;
    }
    .duplicate {
      border: 2px solid red;
      background-color: rgba(255, 0, 0, 0.1);
    }
    .pokemon-card.duplicate::before {
      content: "¡Duplicado! Puedes cambiarlo en el punto más cercano.";
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 8px;
      border-radius: 5px;
      font-size: 12px;
      white-space: nowrap;
      top: -35px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      pointer-events: none;
    }
    .pokemon-card.duplicate:hover::before {
      opacity: 1;
    }
    .warning {
      color: red;
      font-weight: bold;
    }
  `;

static get properties() {
  return {
    pokemonData: { type: Array },
    duplicatedPokemon: { type: Array },
  };
}

constructor() {
  super();
  this.pokemonData = [];
  this.duplicatedPokemon = [];
}

validateRepeated() {
  const counts = this.pokemonData.reduce((acc, item) => {
    acc[item.name] = (acc[item.name] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(counts).filter((name) => counts[name] > 1);
}

connectedCallback() {
  super.connectedCallback();
  this.duplicatedPokemon = this.validateRepeated();
}

render() {
  return html`
    <ul class="pokemon-grid">
      ${this.pokemonData.map((pokemon) => {
        const isDuplicate = this.duplicatedPokemon.includes(pokemon.name);
        return html`
          <li
            class="pokemon-card ${isDuplicate ? "duplicate" : ""}"
            @click="${() => this._showEvolutions(pokemon)}"
          >
            <img
              src="/public/images/${pokemon.image}"
              alt="${pokemon.name}"
            />
            <div class="pokemon-name">${pokemon.name}</div>
            <div class="pokemon-type">${pokemon.type}</div>
            ${isDuplicate
              ? html`<span class="warning">¡Pokemon Duplicado!</span>`
              : ""}
          </li>
        `;
      })}
    </ul>
  `;
}

_showEvolutions(pokemon) {
  (pokemon);
  
  this.dispatchEvent(new CustomEvent("show-evolutions", { detail: pokemon }));
}
}

customElements.define("pokemon-list", PokemonList);
