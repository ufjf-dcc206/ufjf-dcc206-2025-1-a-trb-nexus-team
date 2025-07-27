
import { GerenciadorJogo } from "./gerenciadorJogo.js"; // Importando o back-end

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
      .hand-view {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-bottom: 15px;
      }
      .action-buttons {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
      }
      button {
        padding: 10px 15px;
        cursor: pointer;
        font-size: 16px;
      }
      .message-box {
        min-height: 40px;
        padding: 10px;
        background: #eee;
        border: 1px solid #ccc;
        border-radius: 5px;
        width: 300px;
        text-align: center;
        font-weight: bold;
      }
    </style>
    <div class="game-container">
      <status-bar></status-bar>
      <div class="hand-view"></div>
      <div class="action-buttons">
        <button id="play-btn">Jogar</button>
        <button id="discard-btn">Descartar</button>
      </div>
      <div class="message-box">Bem-vindo ao jogo!</div>
    </div>
  `;
}


  }

  // Atualiza os dados exibidos na UI
  private updateUI() {
  const status = this.shadow.querySelector("status-bar") as HTMLElement;
  status.setAttribute("rodada", this.gerenciador["rodada_atual"].toString());
  status.setAttribute("meta", this.gerenciador.meta_visual.toString());
  status.setAttribute("pontuacao", this.gerenciador["pontuacao"].toString());
  status.setAttribute("jogadas", this.gerenciador.jogadas_restantes.toString());
  status.setAttribute("descartes", this.gerenciador.descartes_restantes.toString());

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
