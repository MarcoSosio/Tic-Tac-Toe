/*
Caselle è una HTMLCollection che contiene le caselle, ogni casella ha un indice
da 0 a 8, quando si clicca su una casella le verrà assegnata una proprietà data-mossa
che potrà essere cerchio o croce

le caselle sono disposte così considernndo gli indici delle caselle

0 1 2
3 4 5
6 7 8
*/

//TODO Alcune cose da sistemare; funzioni inizianti con _ sono di nuova implementazione
const caselle=document.getElementsByTagName("td");
const dialog=document.getElementsByTagName("dialog")[0];

let turni=0;
let vinto=false;
const combinazioni_vincenti=[
    [0,1,2],[3,4,5],[6,7,8],    //orizzontali
    [0,3,6],[1,4,7],[2,5,8],    //verticali
    [0,4,8],[2,4,6]             //diagonali
];

function _verifica_vittoria(scelta){
    for(const combinazione of combinazioni_vincenti){
        vinto = true;
        for(const num of combinazione){
            if(caselle[num].dataset.mossa!=scelta){
                vinto=false;
                break;
            }
        }
        if(vinto){
            break;
        }
    }
}

function _fine_gioco(scelta){
    const testo_dialog = document.getElementById("testo_dialog");

    function pulisci_tabella(){
        for (const singola_casella of caselle) {

            for (const elemento of singola_casella.children) {
                if (elemento.classList.contains("circle-active")) {
                    elemento.classList.remove("circle-active");
                }
                else if (elemento.classList.contains("cross-active")) {
                    elemento.classList.remove("cross-active");
                }
            }
        }
    }

    function reset(){
        turni=0;
        vinto=false;
        for(const singola_casella of caselle){
            singola_casella.dataset.mossa="";
        }
    }

    function _vittoria(){

        if(scelta=="cerchio"){
           testo_dialog.innerHTML="Ha vinto il giocatore blu";
           dialog.classList.add("blue-win");
        }
        else if(scelta=="croce"){
            testo_dialog.innerHTML="Ha vinto il giocatore rosso";
            dialog.classList.add("red-win");
        }
    }

    function pareggio(){
        testo_dialog.innerHTML="Pareggio";
        dialog.classList.add("pareggio");
    }

    if(vinto){
        _vittoria();
    }
    else if(turni==9){
        pareggio();
    }
    pulisci_tabella();
    reset();
    dialog.showModal();
}

function controlla(scelta){
    _verifica_vittoria(scelta);
    if(vinto||turni==9){
        _fine_gioco(scelta);
    }
}

function _handler_mossa(){
    const singola_casella=this;
    
    function esegui_mossa(){
        console.log(singola_casella.dataset.mossa);
        if (!singola_casella.dataset.mossa) { // "" è false
            let elemento; //cerchio o croce
            let scelta;
            turni++;

            if (turni % 2 == 0) {
                elemento = singola_casella.children[0]; //cerchio
                elemento.classList.add("circle-active");
                scelta = "cerchio"
            }
            else {
                elemento = singola_casella.children[1]; //croce
                elemento.classList.add("cross-active");
                scelta = "croce";
            }
            singola_casella.dataset.mossa = scelta;
            controlla(scelta);
        }
    }
    esegui_mossa();
}

for(const singola_casella of caselle){
    singola_casella.addEventListener("click",_handler_mossa);
}