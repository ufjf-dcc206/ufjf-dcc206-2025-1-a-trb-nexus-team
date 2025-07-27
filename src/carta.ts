//criando types personalizados para Naipe e Valor
export type Naipe = "♠" | "♥" | "♦" | "♣";
export type Valor =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

// criação da classe Carta e seus métodos
export class Carta {
  // atributos padrões da classe em forma privada
  private naipe: Naipe;
  private valor: Valor;
  constructor(valor: Valor, naipe: Naipe) {
    this.naipe = naipe;
    this.valor = valor;
  }

  // Melhoria do get
  // Basicamente getPeso agora pega o proprio valor da carta e converte para o seu peso no formato de inteiro(number);

  get Peso(): number {
    if (["J", "Q", "K"].includes(this.valor)) return 10;
    if (this.valor === "A") return 15;
    return parseInt(this.valor);
  }

  // Getters para acessar os demais atributos
  get Naipe(): Naipe {
    return this.naipe;
  }

  get Valor(): Valor {
    return this.valor;
  }

  //mostra a carta via console
  mostrarCarta(): void {
    console.log(`${this.valor}${this.naipe} ${this.Peso}`);
  }
}

//teste inicial
