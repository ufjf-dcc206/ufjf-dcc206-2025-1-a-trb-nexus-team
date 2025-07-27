import { Carta } from "./carta.ts";
import { Baralho } from "./baralho.ts";
//import type { Naipe, Valor } from "./carta.js";
import { Mao } from "./mao.ts";

// segundo nossa pesquisa por fora o Record se assemelha a um dicionario
export type dicionario = Record<string, number>;

//administra o jogo, controla as rodadas, pontuação e interações do jogador
export class GerenciadorJogo {
    private num_jogadas_restante: number = 4;
    private num_descartes_restante : number = 3;
    private meta : number = 100;

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

    get meta_visual(): number {
        return this.meta;
    }
    
    get jogadas_restantes(): number {
        return this.num_jogadas_restante;
    }

    get descartes_restantes(): number {
        return this.num_descartes_restante;
    }
    public mostrarStatus(): void {
        //hub do jogo
        console.log(`Rodada: ${this.rodada_atual}`);
        console.log(`Jogadas restantes: ${this.jogadas_restantes}`);
        console.log(`Descartes restantes: ${this.num_descartes_restante}`);
        console.log(`Meta: ${this.meta}`);
        console.log(`Pontuação atual: ${this.pontuacao}`);
        this.mao.mostrarMao();
        console.log("Selecione as cartas para jogar ou descartar.");
        const entrada = prompt();
        this.processarEntrada(entrada);
    }
    private processarEntrada(entrada: string | null): void {
        if (!entrada) {
            console.log("Entrada inválida. Tente novamente.");
            return;
        }

        const indices = entrada.split(",").map(Number);
        indices.forEach(indice => this.mao.selecionarCarta(indice));
        this.mao.mostrarMao();
        console.log("Digite 'jogar' para jogar as cartas selecionadas ou 'descartar' para descartar.");
        
        const acao = prompt();
        if (acao === "jogar") {
            this.jogar();
        } else if (acao === "descartar") {
            this.descartar();
        } else {
            console.log("Ação inválida. Tente novamente.");
        }
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

        // contagem de pontos
        const pontos = this.calcularPontuacao(jogadas);
        this.pontuacao += pontos;
        this.num_jogadas_restante--;
        console.log(`Você jogou ${jogadas.length} cartas e ganhou ${pontos} pontos.`);
        //verificação de resultado
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

    private verificarResultado(): void {
        // Verifica se a pontuação atingiu ou ultrapassou a meta
        if (this.pontuacao >= this.meta) {
            console.log(`Parabéns! Você alcançou a meta de ${this.meta} pontos!`);
            this.novaRodada();
        } else if (this.num_jogadas_restante === 0) {
            console.log("Fim da rodada. Você não atingiu a meta.");
            this.rodada_atual = 0;
            this.num_jogadas_restante = 4;
            this.num_descartes_restante = 3;
            this.meta = 100;
            this.pontuacao = 0;
            this.iniciarJogo();
        }
    }

    private identificarCombos(cartas: Carta[]): { nome: string, multiplicador: number } {
        // Identificar se é carta alta(maior carta), par, dois pares, trinca, full house, flush, quadra tem a possibilidade de ter uma carta que não fa parte de nenhum
        // combo logica do balatro
        const valores = cartas.map(carta => carta.Valor);
        const naipes = cartas.map(carta => carta.Naipe);

        const contagemValores: dicionario = {};

        //similar um enumerate em python
        for (const valor of valores) {
            //conta quantas vezes cada valor aparece
            contagemValores[valor] = (contagemValores[valor] || 0) + 1;
        }

        //pega o valor das cartas e coloca de forma decrescente
        const quantidade = Object.values(contagemValores).sort((a,b) => b-a);
        //verifica se tem par, dois pares, trinca, quadra, full house e flush por meio do includes que praticamente verifica se o valor existe no array e se é
        //na quantidade correspondente sendo booleanos
        const temPar : boolean = quantidade.includes(2);
        const temDoisPares : boolean = quantidade.filter(q => q === 2).length === 2;
        const temTrinca : boolean = quantidade.includes(3);
        const temQuadra : boolean = quantidade.includes(4);
        const temFullHouse : boolean = temTrinca && temPar;
        //verifica se o naipe inicial é o mesmo de todos os outros
        const temFlush : boolean = naipes.every(naipe => naipe === naipes[0] && naipes.length === 5);

        //condicional dos booleanos com seus retornos.
        if(temQuadra){
            return { nome: "Quadra", multiplicador: 8 };
        }
        if(temFullHouse){
            return { nome: "Full House", multiplicador: 6 };
        }
        if(temFlush){
            return { nome: "Flush", multiplicador: 5 };
        }
        if(temTrinca){
            return { nome: "Trinca", multiplicador: 3 };
        }
        if(temDoisPares){
            return { nome: "Dois Pares", multiplicador: 2 };
        }
        if(temPar){
            return { nome: "Par", multiplicador: 2 };
        }
        return { nome: "Carta Alta", multiplicador: 1 };
    }

    private calcularPontuacao(cartas: Carta[]): number {
        const { nome, multiplicador } = this.identificarCombos(cartas);
        const soma = cartas.reduce((acc, carta) => acc + carta.Peso, 0);
        const pontos = soma * multiplicador;
        console.log(` Soma:${soma} Multiplicador: ${multiplicador}`);
        console.log(`Combo: ${nome}, Pontos: ${pontos}`);
        return pontos;
    }
}

// Teste inicial

