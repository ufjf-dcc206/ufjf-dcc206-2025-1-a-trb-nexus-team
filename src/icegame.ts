import { GerenciadorJogo } from "./gerenciadorJogo.ts";
import "./acoes.ts";
import "./cabecalho.ts";
import "./status.ts";
import "./mao_baralho.ts";

export default class IceGame extends HTMLElement {
    private gerenciadorJogo: GerenciadorJogo;
    private cabecalho!: HTMLElement;
    private status!: HTMLElement;
    private mao_baralho!: HTMLElement;
    constructor() {
        super();
        this.gerenciadorJogo = new GerenciadorJogo();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
        <style>
            :host {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            width: 100vw;
            height: 100vh;
            background: #28a745;
            color: white;
            font-family: Arial, sans-serif;
            }
        </style>

        <ice-cabecalho></ice-cabecalho>
        <ice-status></ice-status>
        <ice-mao-baralho></ice-mao-baralho>
        <ice-acoes></ice-acoes>`;
    }

    connectedCallback() {
        this.cabecalho = this.shadowRoot!.querySelector('ice-cabecalho')!;
        this.status = this.shadowRoot!.querySelector('ice-status')!;
        this.mao_baralho = this.shadowRoot!.querySelector('ice-mao-baralho')!;

        //atualiza o hub do usuário
        this.atualizadorHub();
        this.shadowRoot!.querySelector('ice-acoes')!.addEventListener('ice-acao', (event:Event) => {
            const dado_entrada = (event as CustomEvent).detail; //carrega o dado do evento de click
            if(dado_entrada === 'jogar') {
                this.jogar();
            } else if(dado_entrada === 'descartar') {
                this.descartar();
            }
        });
    }

    private atualizadorHub( combo: string = 'Nenhum', somaMulti: string = '0') {
        (this.cabecalho as any).atualizar = (this.gerenciadorJogo['pontuacao'], this.gerenciadorJogo['rodada_atual']);
        (this.status as any).atualizar(
            this.gerenciadorJogo['meta'],
            combo,
            somaMulti,
            this.gerenciadorJogo['num_jogadas_restante'],
            this.gerenciadorJogo['num_descartes_restante']
        );

        const cartas = this.gerenciadorJogo['mao'].MaoDoBaralho.map(carta => ({
            valor: carta.Valor,
            naipe: carta.Naipe
        }));
        (this.mao_baralho as any).atualizar(cartas);
    }

    public jogar() {
        const indices = (this.mao_baralho as any).getSelecionadas();
        if (indices.length === 0) {
            console.log("Nenhuma carta selecionada para jogar.");
            return;
        }
        const cartas = this.gerenciadorJogo['mao'].cartasSelecionadas();
        const pontos = this.gerenciadorJogo['jogar']();
        const combo = this.gerenciadorJogo['identificarCombos'](cartas);
        const soma = cartas.reduce((acc, carta) => acc + carta.Peso, 0);
        this.gerenciadorJogo['jogar']();
        this.atualizadorHub(combo.nome, `${soma} x ${combo.multiplicador}`);
    }

    public descartar() {
        const indices = (this.mao_baralho as any).getSelecionadas();
        if (indices.length === 0) {
            console.log("Nenhuma carta selecionada para descartar.");
            return;
        }
        this.gerenciadorJogo['descartar']();
        this.atualizadorHub();
    }
}
customElements.define('ice-game', IceGame);