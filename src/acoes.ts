export default class Acoes extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
        <style>
        .actions {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }
        button {
          background: #fff;
          color: #28a745;
          font-size: 1.2rem;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
        }
        button:hover {
          background: #f0f0f0;
        }
        </style>
       <div class="actions">
        <button id="btn-jogar">Jogar</button>
        <button id="btn-descartar">Descartar</button>
       </div>
    `;
  }

  connectedCallback() {
    this.shadowRoot!.getElementById("btn-jogar")!.addEventListener(
      "click",
      () => {
        this.dispatchEvent(
          new CustomEvent("jogar", { bubbles: true, composed: true })
        );
      }
    );
    this.shadowRoot!.getElementById("btn-descartar")!.addEventListener(
      "click",
      () => {
        this.dispatchEvent(
          new CustomEvent("descartar", { bubbles: true, composed: true })
        );
      }
    );
  }
}
