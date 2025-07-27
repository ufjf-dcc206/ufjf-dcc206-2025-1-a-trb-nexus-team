
export class CardItem extends HTMLElement {
  private shadow: ShadowRoot;
  private selected: boolean = false;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["valor", "naipe"];
  }

  attributeChangedCallback() {
    this.render();
  }

  connectedCallback() {
    this.addEventListener("click", this.toggleSelect.bind(this));
  }

  private toggleSelect() {
    const index = this.getAttribute("index");
    const event = new CustomEvent("card-toggle", {
      detail: { index: Number(index), selected: !this.selected },
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  public setSelected(state: boolean) {
    this.selected = state;
    this.render();
  }

  private render() {
    const valor = this.getAttribute("valor") || "";
    const naipe = this.getAttribute("naipe") || "";

    this.shadow.innerHTML = `
      <style>
        .card {
          width: 60px;
          height: 90px;
          border: 2px solid ${this.selected ? "blue" : "#333"};
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: white;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          user-select: none;
        }
      </style>
      <div class="card">${valor}<br>${naipe}</div>
    `;
  }
}

customElements.define("card-item", CardItem);

