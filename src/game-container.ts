// game-container.ts
import { GerenciadorJogo } from "./gerenciadorJogo.ts"; // Importando o back-end
import "./card-item.ts"; // Importando o componente de carta

export class GameContainer extends HTMLElement {
  private shadow: ShadowRoot;
  private gerenciador: GerenciadorJogo;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });

    // Criamos uma instância do gerenciador do jogo (usa toda a lógica do back-end)
    this.gerenciador = new GerenciadorJogo();

    // Renderiza a interface inicial
    this.render();
  }

  connectedCallback() {
    // Chamado quando o componente é inserido no DOM
    this.updateUI();
    this.addEventListeners();
  }

  private render() {
    this.shadow.innerHTML = `
      <style>
        .game-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: Arial, sans-serif;
          padding: 20px;
        }
        .status-bar {
          margin-bottom: 15px;
          font-size: 18px;
        }
        .hand-view {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 15px;
        }
        .card {
          border: 1px solid #333;
          border-radius: 8px;
          padding: 10px;
          width: 50px;
          text-align: center;
          cursor: pointer;
          background: white;
          user-select: none;
        }
        .card.selected {
          background: yellow;
        }
        .action-buttons {
          display: flex;
          gap: 10px;
        }
        button {
          padding: 10px 15px;
          cursor: pointer;
          font-size: 16px;
        }
      </style>
      <div class="game-container">
        <div class="status-bar"></div>
        <div class="hand-view"></div>
        <div class="action-buttons">
          <button id="play-btn">Jogar</button>
          <button id="discard-btn">Descartar</button>
        </div>
      </div>
    `;
  }

  // Atualiza os dados exibidos na UI
  private updateUI() {
    const statusBar = this.shadow.querySelector(".status-bar") as HTMLDivElement;
    statusBar.innerHTML = `
      <div>Rodada: ${this.gerenciador["rodada_atual"]}</div>
      <div>Meta: ${this.gerenciador.meta_visual}</div>
      <div>Pontuação: ${this.gerenciador["pontuacao"]}</div>
      <div>Jogadas restantes: ${this.gerenciador.jogadas_restantes}</div>
      <div>Descartes restantes: ${this.gerenciador.descartes_restantes}</div>
    `;

    // Renderiza as cartas da mão
    const handView = this.shadow.querySelector(".hand-view") as HTMLDivElement;
    handView.innerHTML = "";
    const mao = this.gerenciador["mao"].MaoDoBaralho;
    mao.forEach((carta, index) => {
      const cardEl = document.createElement("card-item");
        cardEl.setAttribute("valor", carta.Valor);
        cardEl.setAttribute("naipe", carta.Naipe);
        cardEl.setAttribute("index", index.toString());
        handView.appendChild(cardEl);
      
    });
  }

private addEventListeners() {
  const handView = this.shadow.querySelector(".hand-view") as HTMLDivElement;

  handView.addEventListener("card-toggle", (event: Event) => {
    const customEvent = event as CustomEvent;
    const index = parseInt(customEvent.detail.index);
    this.gerenciador["mao"].selecionarCarta(index);
  });

  const playBtn = this.shadow.querySelector("#play-btn") as HTMLButtonElement;
  playBtn.addEventListener("click", () => {
    this.gerenciador.jogar();
    this.updateUI();
  });

  const discardBtn = this.shadow.querySelector("#discard-btn") as HTMLButtonElement;
  discardBtn.addEventListener("click", () => {
    this.gerenciador.descartar();
    this.updateUI();
  });
}
}
// Registra o componente para uso no HTML
customElements.define("game-container", GameContainer);
