import { Carta } from "./carta.js";
import { Baralho } from "./baralho.js";
import { Mao } from "./mao.js";

export type dicionario = Record<string, number>;

export class GerenciadorJogo {
  private num_jogadas_restante: number = 4;
  private num_descartes_restante: number = 3;
  private meta: number = 100;

  private rodada_atual: number = 1;
  private pontuacao: number = 0;
  private mao: Mao;
  private baralho: Baralho;

  constructor() {
    this.baralho = new Baralho();
    this.mao = new Mao(this.baralho);
  }

  public getStatus() {
    return {
      rodada: this.rodada_atual,
      meta: this.meta,
      pontuacao: this.pontuacao,
      jogadas: this.num_jogadas_restante,
      descartes: this.num_descartes_restante,
      mao: this.mao.MaoDoBaralho
    };
  }

  public jogar() {
    if (this.num_jogadas_restante <= 0) {
      return { sucesso: false, mensagem: "Você não tem mais jogadas restantes." };
    }

    const jogadas = this.mao.jogarSelecionadas();
    if (jogadas.length === 0) {
      return { sucesso: false, mensagem: "Nenhuma carta selecionada para jogar." };
    }

    const { nome, multiplicador } = this.identificarCombos(jogadas);
    const soma = jogadas.reduce((acc, carta) => acc + carta.Peso, 0);
    const pontos = soma * multiplicador;
    this.pontuacao += pontos;
    this.num_jogadas_restante--;

    const resultadoRodada = this.verificarResultado();
    return {
      sucesso: true,
      mensagem: `Combo: ${nome} | Soma: ${soma} | x${multiplicador} = ${pontos} pontos.`,
      pontosGanhos: pontos,
      combo: nome,
      fimRodada: resultadoRodada
    };
  }

  public descartar() {
    if (this.num_descartes_restante <= 0) {
      return { sucesso: false, mensagem: "Você não tem mais descartes restantes." };
    }

    const descartes = this.mao.descartarSelecionadas();
    if (descartes.length === 0) {
      return { sucesso: false, mensagem: "Nenhuma carta selecionada para descartar." };
    }

    this.num_descartes_restante--;
    return { sucesso: true, mensagem: `Você descartou ${descartes.length} cartas.` };
  }

  private verificarResultado(): "vitoria" | "derrota" | "continua" {
    if (this.pontuacao >= this.meta) {
      this.rodada_atual++;
      this.meta *= 2;
      this.num_jogadas_restante = 4;
      this.num_descartes_restante = 3;
      this.pontuacao = 0;
      this.mao = new Mao(this.baralho);
      return "vitoria";
    } else if (this.num_jogadas_restante === 0) {
      this.rodada_atual = 1;
      this.meta = 100;
      this.num_jogadas_restante = 4;
      this.num_descartes_restante = 3;
      this.pontuacao = 0;
      this.mao = new Mao(this.baralho);
      return "derrota";
    }
    return "continua";
  }

  private identificarCombos(cartas: Carta[]): { nome: string; multiplicador: number } {
    const valores = cartas.map(c => c.Valor);
    const naipes = cartas.map(c => c.Naipe);
    const contagemValores: dicionario = {};

    for (const valor of valores) {
      contagemValores[valor] = (contagemValores[valor] || 0) + 1;
    }

    const quantidade = Object.values(contagemValores).sort((a, b) => b - a);
    const temPar = quantidade.includes(2);
    const temDoisPares = quantidade.filter(q => q === 2).length === 2;
    const temTrinca = quantidade.includes(3);
    const temQuadra = quantidade.includes(4);
    const temFullHouse = temTrinca && temPar;
    const temFlush = naipes.every(naipe => naipe === naipes[0] && naipes.length === 5);

    if (temQuadra) return { nome: "Quadra", multiplicador: 8 };
    if (temFullHouse) return { nome: "Full House", multiplicador: 6 };
    if (temFlush) return { nome: "Flush", multiplicador: 5 };
    if (temTrinca) return { nome: "Trinca", multiplicador: 3 };
    if (temDoisPares) return { nome: "Dois Pares", multiplicador: 2 };
    if (temPar) return { nome: "Par", multiplicador: 2 };

    return { nome: "Carta Alta", multiplicador: 1 };
  }
}
