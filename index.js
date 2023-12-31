const caselle=document.getElementsByTagName("td");
const dialog=document.getElementsByTagName("dialog")[0];
// const bottone_dialog = document.getElementById("bottone_dialog");
let turni=0;
let vinto=false;
/*Caselle è una HTMLCollection che contiene le caselle, ogni casella ha un indice
da 0 a 8, quando si clicca su una casella le verrà assegnata una proprietà data-mossa
che potrà essere cerchio o croce

le caselle sono disposte così considernndo gli indici delle caselle

0 1 2
3 4 5
6 7 8
*/

function controlla_orizzontale(scelta){
    if(! vinto){
        for (let i = 0; i <= 6; i += 3) {//scorri righe
            vinto = true; //presuppongo la vittoria, controllo se NON è così
            for (let j = 0; j <= 2; j++) {//controlla tutti gli elementi della riga
                if (caselle[i + j].dataset.mossa != scelta) {
                    vinto = false;
                    break; //mi basta anche solo che ci sia una mossa sbagliata
                }
            }
            if (vinto) { //se anche solo una riga è vincente ho vinto quindi termino
                break;
            }
        }
    } 
}

function controlla_verticale(scelta){ //analogamente a sopra ma controllo le colonne
    if(!vinto){
        for (let i = 0; i <= 2; i += 1) {//scorri colonne
            vinto = true;
            for (let j = 0; j <= 6; j += 3) {//controlla colonna
                if (caselle[i + j].dataset.mossa != scelta) {
                    vinto = false;
                    break;
                }
            }
            if (vinto) {
                break;
            }
        }
    } 
}

function controlla_diagonale(scelta){
    /* 
    0 1 2
    3 4 5
    6 7 8
    */
    /*Per far si che si possa fare tris in diagonale devo partire a controllare 
    le due caselle agli angoli in alto*/
    if(!vinto){
        vinto = true;
        for (let j = 0; j <= 8; j += 4) {
            if (caselle[j].dataset.mossa != scelta) {
                vinto = false;
                break;
            }
        }
        if (!vinto) {
            vinto = true;
            for (let j = 2; j <= 6; j += 2) {
                if (caselle[j].dataset.mossa != scelta) {
                    vinto = false;
                    break;
                }
            }
        }
    }  
}

function vittoria(scelta){
    const teso_finestra = document.getElementById("testo_finestra");
    if(vinto || turni==9){
        if (vinto) {
            if (scelta == "cerchio") {
                teso_finestra.innerHTML = "Ha vinto il giocatore blu";
                dialog.style.color = "royalblue";
                dialog.style.boxShadow = "0 0 10px 4px royalblue";
            }
            else {
                teso_finestra.innerHTML = "Ha vinto il giocatore rosso";
                dialog.style.color = "red";
                dialog.style.boxShadow = "0 0 10px 4px red";
            }
            dialog.showModal();
        }
        else if (turni == 9) {
            teso_finestra.innerHTML = "Pareggio";
            dialog.style.color = "black";
            dialog.style.boxShadow = "0 0 10px 4px white";
            dialog.showModal();
        }
        for(const singola_casella of caselle){
            if(singola_casella.dataset.mossa=="cerchio"){
                singola_casella.children[0].style.border="transparent";
            }
            else if(singola_casella.dataset.mossa=="croce"){
                for(const linea of singola_casella.children[1].children){
                    linea.style.backgroundColor="transparent";
                }
            }
        }
        for(const singola_casella of caselle){
            singola_casella.dataset.mossa = "";
        }
        vinto=false;
        turni=0;
    }
    
}

function controlla(scelta){
    controlla_orizzontale(scelta);
    controlla_verticale(scelta);
    controlla_diagonale(scelta);
    vittoria(scelta);
}

function handler_mossa(){
    console.log(! this.dataset.mossa);
    console.log(typeof this.dataset.mossa);
    if( ! this.dataset.mossa){
        turni++;
        if (turni % 2 == 0) {
            this.dataset.mossa="cerchio";
            const cerchio = this.children[0];
            cerchio.style.border = "5px solid royalblue";
            controlla("cerchio");
        }
        else {
            this.dataset.mossa = "croce";
            const croce = this.children[1];
            for (const linea of croce.children) {
                linea.style.backgroundColor = "red";
            }
            controlla("croce");
        }
    }
}

for(const singola_casella of caselle){
    singola_casella.addEventListener("click",handler_mossa);
}