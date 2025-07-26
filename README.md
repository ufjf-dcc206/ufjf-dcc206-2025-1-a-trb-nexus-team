[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/Fq80rDCH)

Plano de desenvolvimento para o projeto ICElatro:
Ideia:semelhante do balatro

Sacar cartas de um baralho tradicional de 4 naipes (2 ao 10, J, Q, K, A) para a mão;
A mão ter no máximo 8 cartas;
Selecionar até 5 cartas da mão para serem jogadas;  (DIMINUI NUMERO DE MÃOS)
Selecionar até 5 cartas da mão para serem descartadas; (DIMINUI NUMERO DE DESCARTES)
Jogar as cartas selecionadas para fazer algumas combinações de poker: 

maior carta : mais valia é o As com 2 mais fraco , 

duplas : formar um par com 2 numerações iguais,

trincas: um par com 3 numerações iguais, 

full-house: 1 trinca + uma dupla, 

flushs: 5 cartas de mesmo naipe,

quadras: 4 cartas iguais;

Apenas a maior combinação do das cartas jogadas pontua;

A pontuação é a soma dos números da cartas vezes a raridade da mão (figuras valem 10, ases valem 15 e numeros valem numeros);
Jogar no máximo de 4 mãos e descartar no máximo 3 vezes;
Para vencer uma rodada, deve atingir um número de pontos do desafio começando de 100 pontos.
Se o jogador não somar o número total de pontos depois de jogar as disponíveis, ele é derrotado: mão = 0 &&  total de pontos < limite da pontuação ? perdeu : ganhou;
A cada nova rodada os pontos necessários dobram. de 100 a cada nova rodada x2;
Você pode adicionar novas regras desde que não contradizem as anteriores sem um bom motivo.(não grita)
Não precisa de multiplicadores, apenas pontos.