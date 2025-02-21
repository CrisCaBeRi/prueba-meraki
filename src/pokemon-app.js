import { LitElement, html } from "lit";
import "./services/data-manager.js";
import "./components/pokemon-list.js";
import "./components/pokemon-evolutions.js";
import "./components/error-message.js";
import "./components/loading-spinner.js";
import "./components/pokemon-layout.js";

export class PokemonApp extends LitElement {
  static get properties() {
    return {
      pokemonData: { type: Array },
      selectedPokemon: { type: Object },
      loading: { type: Boolean },
      error: { type: String },
    };
  }

  constructor() {
    super();
    this.pokemonData = [];
    this.selectedPokemon = null;
    this.loading = true;
    this.error = null;
  }

  async connectedCallback() {
    super.connectedCallback();

    // Escuchar eventos personalizados
    this.addEventListener("data-updated", (event) => {
      this.pokemonData = event.detail.pokemonData;
      this.loading = event.detail.loading;
      this.requestUpdate();
    });

    this.addEventListener("data-error", (event) => {
      this.error = event.detail.error;
      this.loading = false;
      this.requestUpdate();
    });
  }

  async firstUpdated() {
    const dataManager = this.shadowRoot.querySelector("data-manager");
    if (dataManager) {
      ("entrando");
      
      await dataManager.fetchPokemonData();
    }
  }
  updated(changedProperties) {
    if (changedProperties.has("selectedPokemon") && this.selectedPokemon === null) {
      const dataManager = this.shadowRoot.querySelector("data-manager");
      if (dataManager) {
        dataManager.fetchPokemonData();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("data-updated", this.handleDataUpdated);
    this.removeEventListener("data-error", this.handleDataError);
  }

  renderLoading() {
    return html`<loading-spinner></loading-spinner>`;
  }

  renderError() {
    return html`<error-message .message="${this.error}"></error-message>`;
  }

  renderContent() {
    if (this.selectedPokemon) {
      return html`
        <pokemon-evolutions
          .selectedPokemon="${this.selectedPokemon}"
          @go-back="${() => (this.selectedPokemon = null)}"
        >
        </pokemon-evolutions>
      `;
    }
    return html`
      <pokemon-list
        .pokemonData="${this.pokemonData}"
        @show-evolutions="${(e) => (this.selectedPokemon = e.detail)}"
      >
      </pokemon-list>
    `;
  }

  render() {
    return html`
      <pokemon-layout>
        <data-manager></data-manager>
        ${this.loading
          ? this.renderLoading()
          : this.error
          ? this.renderError()
          : this.renderContent()}
      </pokemon-layout>
    `;
  }
}

window.customElements.define("poke-app", PokemonApp);