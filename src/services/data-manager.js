import { LitElement } from "lit";
import { BASEURL } from "../utils/url";

export class DataManager extends LitElement {
  static get properties() {
    return {
      pokemonData: { type: Array },
      loading: { type: Boolean },
      error: { type: String },
    };
  }

  constructor() {
    super();
    this.pokemonData = [];
    this.loading = true;
    this.error = null;
  }

  async fetchPokemonData() {
    this.loading = true;
    this.dispatchEvent(
      new CustomEvent("data-updated", {
        detail: { loading: true },
        bubbles: true,
        composed: true,
      })
    );

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); //simular asincronismo
      const response = await fetch(BASEURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      this.pokemonData = await response.json();
      this._dispatchUpdate({ pokemonData: this.pokemonData });
    } catch (error) {
      this.error = error.message;
      console.error("Error fetching Pokémon data:", error);
      this.dispatchEvent(
        new CustomEvent("data-error", {
          detail: { error: this.error },
          bubbles: true,
          composed: true,
        })
      );
    } finally {
      this.loading = false;
      this._dispatchUpdate({ pokemonData: this.pokemonData });
    }
  }

  async updatePokemon(id, updatedData) {
    try {
      const response = await fetch(`${BASEURL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedPokemon = await response.json();
      this.pokemonData = this.pokemonData.map((p) =>
        p.id === id ? updatedPokemon : p
      );
      this._dispatchUpdate({ pokemonData: this.pokemonData });
      return updatedPokemon;
    } catch (error) {
      console.error("Error updating Pokémon data:", error);
      this.dispatchEvent(
        new CustomEvent("data-error", {
          detail: { error: this.error },
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  _dispatchUpdate(detail) {
    this.dispatchEvent(
      new CustomEvent("data-updated", {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }
}

customElements.define("data-manager", DataManager);
