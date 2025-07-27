import { GerenciadorJogo } from "./gerenciadorJogo";

export default class IceGame extends HTMLElement {
    private gerenciadorJogo: GerenciadorJogo;
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
        <ice-actions></ice-actions>`;
    }

    connectedCallback() {
        this.gerenciadorJogo.iniciarJogo();   
    }

}

customElements.define('ice-game', IceGame);