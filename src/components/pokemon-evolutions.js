import { LitElement, html, css } from "lit";
import "../services/data-manager.js";
import "./modal-box.js"

export class PokemonEvolutions extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 90vh;
    }
    .bg-evolutions {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    button {
      margin-bottom: 10px;
      padding: 10px 20px;
      background: #ffcc00;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 5px;
    }
    button:hover {
      background: #ff9900;
    }
    ul {
      list-style: none;
      padding: 0;
      margin: 20px 0;
      display: flex;
      gap: 15px;
    }
    li {
      text-align: center;
      background: rgba(255, 255, 255, 0.2);
      padding: 10px;
      border-radius: 10px;
    }
    img {
      width: 80px;
      height: auto;
      border-radius: 10px;
      background: white;
      padding: 5px;
    }
    .poke-list {
      display: flex;
      flex-direction: column;
    }
    .poke-list>img{

      margin:2rem auto;
    }
    .poke-list>label{
      text-align:left; 
      font-size:0.8rem; 
      color:gray;

    }
    input {
      margin: 5px 0;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
      width: 100%;
      box-sizing: border-box;
    }
    input:disabled {
      background: #f0f0f0;
    }
    .box-buttons {
      display: flex;
      gap: 10px;
    }
  `;

  static get properties() {
    return {
      selectedPokemon: { type: Object },
      showModal: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.selectedPokemon = null;
    this.showModal = false;
  }

  _goBack() {
    this.dispatchEvent(new CustomEvent("go-back"));
    this.selectedPokemon = null;
  }

  _updateEvolution(index, field, value) {
    const updatedEvolutions = [...this.selectedPokemon.evolutions];
    updatedEvolutions[index] = { ...updatedEvolutions[index], [field]: value };
    this.selectedPokemon = {
      ...this.selectedPokemon,
      evolutions: updatedEvolutions,
    };
    this.requestUpdate();
  }

  modifyPokemon() {
    this.showModal = true; // Mostrar el modal de confirmación
  }

  async confirmModification() {
    if (!this.selectedPokemon) return;
    const dataManager = this.shadowRoot.querySelector("data-manager");

    if (dataManager) {
        await dataManager.updatePokemon(
        this.selectedPokemon.id,
        this.selectedPokemon
      );
    }
    this.showModal = false; // Cerrar el modal después de la modificación
  }

  closeModal() {
    this.showModal = false; // Cerrar el modal sin hacer cambios
  }

  render() {
    if (!this.selectedPokemon) return html`<p>Seleccione un Pokémon</p>`;
    return html`
      <data-manager></data-manager>
      <section class="bg-evolutions">       
        <img
          src="/public/images/${this.selectedPokemon.image}"
          alt="${this.selectedPokemon.name}"
        />

        <h2>${this.selectedPokemon.name} - Evoluciones</h2>
        <ul>
          ${this.selectedPokemon.evolutions.map(
            (evo, index) => html`
              <li class="poke-list">
                <img src="/public/images/${evo.image}" alt="${evo.name}" />
                <label>Evolución</label>
                <input
                  type="text"
                  .value="${evo.name}"
                  @input="${(e) =>
                    this._updateEvolution(index, "name", e.target.value)}"
                />
                <label>Tipo</label>
                <input
                  type="text"
                  .value="${evo.type}"
                  @input="${(e) =>
                    this._updateEvolution(index, "type", e.target.value)}"
                />
                <label>Imagen</label>
                <input
                  disabled
                  type="text"
                  .value="${evo.image}"
                  @input="${(e) =>
                    this._updateEvolution(index, "image", e.target.value)}"
                />
              </li>
            `
          )}
        </ul>
        <div class="box-buttons">
        <button @click="${this._goBack}">◀ Volver </button>
        <button @click="${this.modifyPokemon}">Enviar Modificación 💾</button>
        </div>
        
      </section>

      ${this.showModal
        ? html`
            <modal-box 
            .open="${this.showModal}"
          title="Confirmación"
          message="¿Está seguro de que desea modificar el Pokémon?"
          @confirm="${this.confirmModification}"
          @close="${this.closeModal}"></modal-box>
          `
        : ""}
    `;
  }
}

customElements.define("pokemon-evolutions", PokemonEvolutions);