import { Carta } from "./carta.js";
import type { Naipe, Valor } from "./carta.js";

export class Baralho {
  private cartas: Carta[] = [];

  constructor() {
    this.criaBaralho();
    this.embaralhar();
  }

  private criaBaralho(): void {
    const naipes: Naipe[] = ["♠", "♥", "♦", "♣"];
    const valores: Valor[] = [
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

    // Criando um baralho para evitar a questão da duplicação de cartas
    for (let i = 0; i < naipes.length; i++) {
      for (let j = 0; j < valores.length; j++) {
        const carta = new Carta(valores[j], naipes[i]);
        this.cartas.push(carta);
      }
    }
  }

  // Metodo q vai embaralhar as cartas
  private embaralhar(): void {
    for (let i = this.cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Gera um numero aleatório;
      const aux = this.cartas[i];
      this.cartas[i] = this.cartas[j];
      this.cartas[j] = aux; // Tipo um swap das cartas no vetor
    }
  }

  //Metodo para sacar cartas de forma segura do baralho
  public sacarCarta(): Carta | null {
    return this.cartas.shift() || null;
  }
  // Metodo para sacar um num x de cartas do baralho
  public sacarCartas(qtd: number): Carta[] {
    const cartasSacadas: Carta[] = [];
    for (let i = 0; i < qtd; i++) {
      const carta = this.sacarCarta();
      if (carta) cartasSacadas.push(carta);
      else break;
    }
    return cartasSacadas;
  }
  // Retorna o num de cartas restantes no baralho
  public cartasRestantes(): number {
    return this.cartas.length;
  }
}