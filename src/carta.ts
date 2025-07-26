export type Naipe = '♠' | '♥' | '♦' | '♣';
export type Valor = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

class Carta{
  constructor(naipe:string, valor:string){
    this.naipe = naipe;
    this.valor = valor;
  }

}
