'use strict';

function creaElemento(tagElemento, nomeClasse, difficolta, i, listaBombe) {
    const elemento = document.createElement(tagElemento);
    elemento.classList.add(nomeClasse);
    elemento.classList.add(difficolta);
    elemento.innerText = i;
    return elemento;
}

function appendiElemento(elementoCreato, appendino) {
    appendino.append(elementoCreato);
}

function selezioneDifficolta(difficolta) {
    let classeDifficolta = '';
    switch (difficolta) {
        case '81':
            classeDifficolta = 'cella-9';
            break;
        case '49':
            classeDifficolta = 'cella-7';
            break;
        default:
            classeDifficolta = 'cella-10';
    };
    return classeDifficolta;
}

function numeroCelle(difficolta) {
    let maxCelle = 0;
    switch (difficolta) {
        case '81':
            maxCelle = 81;
            break;
        case '49':
            maxCelle = 49;
            break;
        default:
            maxCelle = 100;
    };
    return maxCelle;
}

function cicloCrea(classeDifficolta, maxCelle, appendino, listaBombe) {
    for (let i = 1; i <= maxCelle; i++) {
        const elemento = creaElemento('div', 'cella', classeDifficolta, i, listaBombe);
        appendiElemento(elemento, appendino);
    }
}

function generaBomba(max, min) {
    let listaBombe = [];
    while (listaBombe.length < 16) {
        const numRandom = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!listaBombe.includes(numRandom)) {
            listaBombe[listaBombe.length] = numRandom;
        }
    }
    return listaBombe;
}


function logicaGioco(maxCelle, listaBombe) {
    const messaggioPunti = document.querySelector('.punteggio');
    let punteggio = 0;
    messaggioPunti.innerText = `Punteggio iniziale: ${punteggio}`;
    const celle = document.querySelectorAll('.cella');
    let celleCliccate = [];
    let sconfitta = false;


    for (let i = 0; i < maxCelle; i++) {
        celle[i].addEventListener(
            'click',
            function clickCella() {
                const numeriCelle = Number(celle[i].innerText);
                if (listaBombe.includes(numeriCelle)) {
                    mostraBombe(listaBombe, maxCelle, celle);
                    messaggioPunti.innerText = `sei finito   su una boma hai fatto: ${punteggio} punti`;
                    sconfitta = true;
                } else {
                    if (!sconfitta) {
                        if (!celleCliccate.includes(numeriCelle)) {
                            celleCliccate.push(numeriCelle);
                            celle[i].classList.add('cliccato');
                            punteggio++;
                            messaggioPunti.innerText = `Il tuo punteggio: ${punteggio}`;
                        }
                    }
                }
                if (celleCliccate.length === (maxCelle - listaBombe.length)) {
                    messaggioPunti.innerText = `Hai vinto con ${punteggio} punti`;
                }
            }
        )
    }
}

function mostraBombe(listaBombe, maxCelle, celle) {
    for (let j = 0; j < listaBombe.length; j++) {
        for (let k = 0; k < maxCelle; k++) {
            if (listaBombe[j] === Number(celle[k].innerText)) {
                celle[k].classList.add('bomba');
            }
        }
    }
}



// Main

const tavoloGioco = document.querySelector('.tavolo');
const gioca = document.querySelector('.btn');

gioca.addEventListener(
    'click',
    function () {
        tavoloGioco.innerHTML = '';

        const difficolta = document.getElementById('difficolta').value;

        const classeDifficolta = selezioneDifficolta(difficolta);
        const maxCelle = numeroCelle(difficolta);


        const listaBombe = generaBomba(maxCelle, 1);
        console.log(listaBombe);

        cicloCrea(classeDifficolta, maxCelle, tavoloGioco, listaBombe);

        logicaGioco(maxCelle, listaBombe);

    }
)





