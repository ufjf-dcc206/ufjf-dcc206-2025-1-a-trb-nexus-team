// src/components/status-bar.ts
export class StatusBar extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.render();
  }

  static get observedAttributes() {
    return ["rodada", "meta", "pontuacao", "jogadas", "descartes", "combo", "multiplicador"];
  }

  attributeChangedCallback() {
    this.render();
  }

  private render() {
    const rodada = this.getAttribute("rodada") || "0";
    const meta = this.getAttribute("meta") || "0";
    const pontuacao = this.getAttribute("pontuacao") || "0";
    const jogadas = this.getAttribute("jogadas") || "0";
    const descartes = this.getAttribute("descartes") || "0";

    // 🔍 Novos atributos
    const combo = this.getAttribute("combo") || "-";
    const multiplicador = this.getAttribute("multiplicador") || "-";

    this.shadow.innerHTML = `
      <style>
        .status-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          padding: 10px;
          border: 2px solid #333;
          border-radius: 8px;
          background: #f3f3f3;
          font-family: Arial, sans-serif;
          font-size: 16px;
          margin-bottom: 15px;
        }
        .status-item {
          font-weight: bold;
        }
        .combo-info {
          grid-column: span 2;
          font-size: 14px;
          color: #444;
          text-align: center;
        }
      </style>
      <div class="status-container">
        <div class="status-item">Rodada: ${rodada}</div>
        <div class="status-item">Meta: ${meta}</div>
        <div class="status-item">Pontuação: ${pontuacao}</div>
        <div class="status-item">Jogadas: ${jogadas}</div>
        <div class="status-item">Descartes: ${descartes}</div>
        <div class="combo-info">Último Combo: ${combo} (x${multiplicador})</div>
      </div>
    `;
  }
}

customElements.define("status-bar", StatusBar);
