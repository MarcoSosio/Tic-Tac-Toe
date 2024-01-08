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

let turni=0;
let vinto=false;

/*definisce se posso giocare la partita successiva
impostato su false appena eseguo fine_partita() e reimpostato su true quando
eseguo il reset delle variabile nell'handler del bottone reset()*/
let gioca=true;

const combinazioni_vincenti=[
    [0,1,2],[3,4,5],[6,7,8],    //orizzontali
    [0,3,6],[1,4,7],[2,5,8],    //verticali
    [0,4,8],[2,4,6]             //diagonali
];

function handler_mossa(){

    const singola_casella=this;
    let scelta;
    
    function esegui_mossa(){
        turni++;

        let elemento; //cerchio o croce
        if (turni % 2 == 0) {
            elemento = singola_casella.children[0]; //cerchio
            elemento.classList.add("circle-active");
            scelta = "cerchio";
        }
        else {
            elemento = singola_casella.children[1]; //croce
            elemento.classList.add("cross-active");
            scelta = "croce";
        }
        singola_casella.dataset.mossa = scelta;
    }


    let numeri_vincenti=[];
    function verifica_vittoria() {
        for (const combinazione of combinazioni_vincenti) {
            vinto = true;
            for (const num of combinazione) {
                if (caselle[num].dataset.mossa != scelta) {
                    vinto = false;
                    break;
                }
            }
            if (vinto) {
                numeri_vincenti=combinazione;
                break;
            }
        }
    }


    function fine_gioco() {
        const result = document.getElementById("result");
        const text_result = document.getElementById("text_result");
        //blocco il gioco fino a che il bottone per rigiocare non viene premuto
        gioca=false; 

        function vittoria() {

            function stile_bottone(){
                result.style.visibility="visible";
                if (scelta == "cerchio") {
                    text_result.innerHTML = "Ha vinto il giocatore blu";
                    result.classList.add("blue-win");
                }
                else if (scelta == "croce") {
                    text_result.innerHTML = "Ha vinto il giocatore rosso";
                    result.classList.add("red-win");
                }
            }

            function stile_elementi_vincenti(){
                for (const indice of numeri_vincenti) {
                    if (caselle[indice].dataset.mossa == "cerchio") {
                        const elemento = caselle[indice].children[0];
                        elemento.classList.add("circle-win");
                    }
                    else if (caselle[indice].dataset.mossa == "croce") {
                        const elemento = caselle[indice].children[1];
                        elemento.classList.add("cross-win");
                    }
                }
            }

            stile_bottone();
            stile_elementi_vincenti();
        }


        function pareggio() {
            result.style.visibility = "visible";
            text_result.innerHTML = "Pareggio";
            result.classList.add("pareggio");
        }


        function reset(){

            function pulisci_tabella() {
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

            function reset_variabili() {
                turni = 0;
                vinto = false;
                //rimettto su true perché a seguito di aver premuto questo bottone posso 
                //iniziare una nuova partita
                gioca = true;
                for (const singola_casella of caselle) {
                    singola_casella.dataset.mossa = "";
                }
            }

            function togli_classi() {
                result.style.visibility = "hidden";

                result.classList.remove("red-win", "blue-win", "pareggio");
                for (const singola_casella of caselle) {
                    for (const elemento of singola_casella.children) {
                        elemento.classList.remove("circle-win", "cross-win");
                    }
                }
            }

            togli_classi();
            pulisci_tabella();
            reset_variabili();
        }

        if (vinto) {
            vittoria();
        }
        else if (turni == 9) {
            pareggio();
        }
        result.addEventListener("click",reset);
    }


    if (!singola_casella.dataset.mossa){
        if(gioca){
            esegui_mossa();
            verifica_vittoria();
        }
        if (vinto || turni == 9) {
            fine_gioco();
        }
    }
}


for(const singola_casella of caselle){
    singola_casella.addEventListener("click",handler_mossa);
}