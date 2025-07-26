import { Carta } from "./carta.js";
import { Baralho } from "./baralho.js";

export class Mao {
  private maoDoBaralho: Carta[] = [];
  private qtdMaxCartas: number = 8;
  private selecionadas: Set<number> = new Set(); //Vetor generico para armazenar as cartas pré selecionadas
  private baralho: Baralho;

  constructor(baralho: Baralho) {
    this.baralho = baralho;
    this.maoDoBaralho = this.baralho.sacarCartas(this.qtdMaxCartas); // Pega 8 cartas iniciais
  }

  // Acessa a mao do baralho
  public get MaoDoBaralho(): Carta[] {
    return this.maoDoBaralho;
  }
  // Pega sempre o tam da mao
  public get TamanhoMao(): number {
    return this.maoDoBaralho.length;
  }

  // Pré seleciona uma carta da mao e se a mesma já estiver selecionada remove ela
  public selecionarCarta(indice: number): void {
    if (indice < 0 || indice >= this.maoDoBaralho.length) {
      return;
    }

    // Caso a carta já esteja selecionada ela é removida
    if (this.selecionadas.has(indice)) {
      this.selecionadas.delete(indice);
    } else {
      // Conefere se o num de cartas selecionadas é menor que 5
      if (this.selecionadas.size < 5) {
        this.selecionadas.add(indice);
      } else {
        console.log("Você só pode selecionar até 5 cartas.");
      }
    }
  }

  public cartasSelecionadas(): Carta[] {
    return Array.from(this.selecionadas).map((i) => this.maoDoBaralho[i]); // Retorna as cartas pelos indices selecionados
  }

  public jogarSelecionadas(): Carta[] {
    return this.removerSelecionadas();
  }

  public descartarSelecionadas(): Carta[] {
    return this.removerSelecionadas();
  }
private removerSelecionadas(): Carta[] {
    const removidas: Carta[] = [];
    const indices = Array.from(this.selecionadas).sort((a, b) => b - a); // Ordenamento decrescente pra n tirar a carta errada
    for (let i = 0; i < indices.length; i++) {
      removidas.push(this.maoDoBaralho[indices[i]]);
      this.maoDoBaralho.splice(indices[i], 1); // Remove a carta da mão(indice, qtd)
    }
    this.selecionadas.clear();

    // Faz a reposição das cartas retiradas
    const novasCartas = this.baralho.sacarCartas(
      this.qtdMaxCartas - this.maoDoBaralho.length
    );
    this.maoDoBaralho.push(...novasCartas); // Adiciona as novas cartas no final da mão

    return removidas; // Retorna as cartas removidas pois usaremos elas posteriormente para pontuar a jogada
  }

  public mostrarMao(): void {
    console.log(
      "Sua mão:",
      this.maoDoBaralho.map((c, i) => `[${i}] ${c.Valor}${c.Naipe}`).join(" ")
    ); // Percorre a mão e mostra as cartas com seus índices
  }
}