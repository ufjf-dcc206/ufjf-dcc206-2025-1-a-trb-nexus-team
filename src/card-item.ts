export class CardItem extends HTMLElement {
  private shadow: ShadowRoot;
  private selected: boolean = false;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["valor", "naipe", "selected"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.addEventListener("click", this.toggleSelection.bind(this));
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.toggleSelection.bind(this));
  }

  private toggleSelection() {
    this.selected = !this.selected;
    this.setAttribute("selected", this.selected.toString());

    // Dispara evento para o componente pai (game-container)
    this.dispatchEvent(
      new CustomEvent("card-toggle", {
        detail: { index: this.getAttribute("index") },
        bubbles: true, // Permite que o evento suba até game-container
        composed: true,
      })
    );
  }

  private render() {
    const valor = this.getAttribute("valor") || "";
    const naipe = this.getAttribute("naipe") || "";
    const selected = this.hasAttribute("selected") && this.getAttribute("selected") === "true";

    this.shadow.innerHTML = `
      <style>
        .card {
          width: 60px;
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border: 2px solid #333;
          border-radius: 8px;
          background: ${selected ? "#f9e65d" : "#fff"};
          cursor: pointer;
          font-size: 18px;
          font-weight: bold;
          user-select: none;
        }
        .naipe {
          font-size: 16px;
        }
      </style>
      <div class="card">
        <div>${valor}</div>
        <div class="naipe">${naipe}</div>
      </div>
    `;
  }
}

// Registra o componente
customElements.define("card-item", CardItem);
