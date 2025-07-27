
export default class Cabecalho extends HTMLElement {

    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
        <style>
             header {
                display: flex;
                justify-content: space-between;
                width: 90%;
                font-size: 1.5rem;
                margin-top: 10px;
        }
        </style>
        <header>
            <div id="pontuacao">Pontuação: 0</div>
            <div id="rodada">Rodada: 1</div>
        </header>`;
    }

    atualizar(pontuacao: number, rodada: number): void {
        this.shadowRoot!.getElementById('pontuacao')!.textContent = `Pontuação: ${pontuacao}`;
        this.shadowRoot!.getElementById('rodada')!.textContent = `Rodada: ${rodada}`;
    }
}

customElements.define('ice-cabecalho', Cabecalho);