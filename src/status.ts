
export default class Status extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
        <style>
        .status {
          display: flex;
          flex-direction: column;
          gap: 10px;
          font-size: 1.2rem;
        }
      </style>
      <div class="status">
        <div id="meta">Meta: 100</div>
        <div id="combo">Combo: Nenhum</div>
        <div id="somaMulti">Soma x Mult: 0</div>
        <div id="jogadas">Jogadas: 4</div>
        <div id="descartes">Descartes: 3</div>
      </div>
    `;
    }

    atualizar(meta: number, combo: string, somaMulti: number, jogadas: number, descartes: number): void {
        this.shadowRoot!.getElementById('meta')!.textContent = `Meta: ${meta}`;
        this.shadowRoot!.getElementById('combo')!.textContent = `Combo: ${combo}`;
        this.shadowRoot!.getElementById('somaMulti')!.textContent = `Soma x Mult: ${somaMulti}`;
        this.shadowRoot!.getElementById('jogadas')!.textContent = `Jogadas: ${jogadas}`;
        this.shadowRoot!.getElementById('descartes')!.textContent = `Descartes: ${descartes}`;
    }
}

customElements.define('ice-status', Status);