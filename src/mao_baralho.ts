
export class MaoBaralho extends HTMLElement {
    //Armazena as cartas e graças ao set ele não permite duplicatas
    private selecionados: Set<number> = new Set();

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
        <style>
        .hand {
          display: flex;
          gap: 10px;
          justify-content: center;
          margin-top: 20px;
        }
        .card {
          width: 60px;
          height: 90px;
          background: white;
          color: black;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          cursor: pointer;
          user-select: none;
        }
        .selected {
          border: 3px solid yellow;
        }
      </style>
      <div class="hand" id="hand"></div>
    `;
    }

    public atualizar(cartas:{valor:string; naipe:string}[]){
        const container = this.shadowRoot!.getElementById("hand");
        container!.innerHTML = ""; // Limpa o container antes de colocar novas cartas
        cartas.forEach((carta, index) => {
            const div = document.createElement("div");
            div.className = "card";
            div.textContent = `${carta.valor} ${carta.naipe}`;
            div.addEventListener("click", () => this.selecao(div, index));
            container!.appendChild(div);
        });
    }

    //booleano para verificar se a carta está selecionada
    private selecao(div: HTMLDivElement, index: number) {
        if (this.selecionados.has(index)) {
            this.selecionados.delete(index);
            div.classList.remove("selected");
        } else if (this.selecionados.size < 5) {
            this.selecionados.add(index);
            div.classList.add("selected");
        }
    }

    get selecionadas(): number[] {
        return Array.from(this.selecionados);
    }
}

customElements.define('ice-mao-baralho', MaoBaralho);

