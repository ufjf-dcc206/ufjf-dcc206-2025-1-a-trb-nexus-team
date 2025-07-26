//criando types personalizados para Naipe e Valor
export type Naipe = '♠' | '♥' | '♦' | '♣';
export type Valor = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

// criação da classe Carta e seus métodos
class Carta{
 // atributos padrões da classe em forma privada
  private naipe: Naipe;
  private valor: Valor;
  constructor(naipe:Naipe, valor:Valor){
    this.naipe = naipe;
    this.valor = valor;
  }
  // Método get para analise de peso da carta
  /*getPeso():number{
    switch(this.valor){
      case 'A': return 15;
      case '2': return 2;
      case '3': return 3;
      case '4': return 4;
      case '5': return 5;
      case '6': return 6;
      case '7': return 7;
      case '8': return 8;
      case '9': return 9;
      case '10': return 10;
      case 'J': return 10;
      case 'Q': return 10;
      case 'K': return 10;
    }
    throw new Error('Valor inválido');
  }*/

  // Melhoria do get
 // Basicamente getPeso agora pega o proprio valor da carta e converte para o seu peso no formato de inteiro(number);
 getPeso(): number{
  if(['J', 'Q', 'K'].includes(this.valor)) return 10;
  if(this.valor === 'A') return 15;
  return parseInt(this.valor);
}
