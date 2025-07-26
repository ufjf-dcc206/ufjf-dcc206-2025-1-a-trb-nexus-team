import { Carta } from "./carta.js";
import { Baralho } from "./baralho.js";
import type { Naipe, Valor } from "./carta.js";
import { Mao } from "./mao.js";


//administra o jogo, controla as rodadas, pontuação e interações do jogador
export class GerenciadorJogo {
    private num_jogadas_restante: number = 4;
    private num_descartes_restante : number = 3;
    private meta : number = 100;
    private naipe: Naipe[] = ["♠", "♥", "♦", "♣"];
    private valor: Valor[] = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A",
    ];
    private rodada_atual: number = 1;
    private pontuacao: number = 0;
    private mao: Mao;
    private baralho: Baralho;

    constructor(){
        this.baralho = new Baralho();
        this.mao = new Mao(this.baralho);
    }

    public iniciarJogo(): void {
        //função start
        console.log("Iniciando o jogo...");
        this.mostrarStatus();
    }

    public mostrarStatus(): void {
        //hub do jogo
        console.log(`Rodada: ${this.rodada_atual}`);
        console.log(`Jogadas restantes: ${this.num_jogadas_restante}`);
        console.log(`Descartes restantes: ${this.num_descartes_restante}`);
        console.log(`Meta: ${this.meta}`);
        console.log(`Pontuação atual: ${this.pontuacao}`);
        this.mao.mostrarMao();
    }

    public novaRodada(): void {
        //reset nas variáveis pra próxima rodada
        this.rodada_atual++;
        this.num_jogadas_restante = 4;
        this.num_descartes_restante = 3;
        this.meta *= 2;
        this.pontuacao = 0;
        this.mao = new Mao(this.baralho);
        console.log(' ...... Nova rodada iniciando ......');
        this.iniciarJogo();
    }

    // Método para calcular a pontuação das cartas jogadas
    public jogar(): void {
        // Verifica se ainda há jogadas restantes
        if(this.num_jogadas_restante <= 0) {
            console.log("Você não tem mais jogadas restantes.");
            return;
        }

        const jogadas = this.mao.jogarSelecionadas();
        
        //garantir que o jogador selecionou cartas
        if (jogadas.length === 0) {
            console.log("Nenhuma carta selecionada para jogar.");
            return;
        }

        //fazer a contagem de pontos
        const pontos = this.calcularPontuacao(jogadas);
        this.pontuacao += pontos;
        this.num_jogadas_restante--;
        console.log(`Você jogou ${jogadas.length} cartas e ganhou ${pontos} pontos.`);
        //fazer a verificação de resultado
        this.verificarResultado();
        this.mostrarStatus();
    }

    // Método para calcular a pontuação das cartas descartadas
    public descartar(): void {
        // Verifica se ainda há descartes restantes
        if(this.num_descartes_restante <= 0) {
            console.log("Você não tem mais descartes restantes.");
            return;
        }

        const descartes = this.mao.descartarSelecionadas();
        
        //garantir que o jogador selecionou cartas
        if (descartes.length === 0) {
            console.log("Nenhuma carta selecionada para descartar.");
            return;
        }

        this.num_descartes_restante--;
        console.log(`Você descartou ${descartes.length} cartas.`);
        this.mostrarStatus();
    }
}
