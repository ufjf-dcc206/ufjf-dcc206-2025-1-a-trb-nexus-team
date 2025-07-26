import { Carta } from "./carta";
import type { Naipe, Valor } from "./carta";

class Mao{
    private mao: Carta[];
    private tamanho_mao = 5;
    constructor(){
        this.mao = [];
    }

    get TamanhoMao(){
        return this.tamanho_mao;
    }

    criaMao() {
        const naipes: Naipe[] = ['♠', '♥', '♦', '♣'];
        const valores: Valor[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

        for(let i = 0; i< this.TamanhoMao; i++){
            const naipe = naipes[Math.floor(Math.random() * naipes.length)];
            const valor = valores[Math.floor(Math.random() * valores.length)];
            const carta = new Carta(naipe, valor);
            this.mao.push(carta);

        }
    }
}

const minhaMao = new Mao();
minhaMao.criaMao();
console.log(minhaMao);