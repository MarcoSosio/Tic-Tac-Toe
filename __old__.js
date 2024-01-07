// function controlla_orizzontale(scelta) {
//     if (!vinto) {
//         for (let i = 0; i <= 6; i += 3) {//scorri righe
//             vinto = true; //presuppongo la vittoria, controllo se NON è così
//             for (let j = 0; j <= 2; j++) {//controlla tutti gli elementi della riga
//                 if (caselle[i + j].dataset.mossa != scelta) {
//                     vinto = false;
//                     break; //mi basta anche solo che ci sia una mossa sbagliata
//                 }
//             }
//             if (vinto) { //se anche solo una riga è vincente ho vinto quindi termino
//                 break;
//             }
//         }
//     }
// }

// function controlla_verticale(scelta) { //analogamente a sopra ma controllo le colonne
//     if (!vinto) {
//         for (let i = 0; i <= 2; i += 1) {//scorri colonne
//             vinto = true;
//             for (let j = 0; j <= 6; j += 3) {//controlla colonna
//                 if (caselle[i + j].dataset.mossa != scelta) {
//                     vinto = false;
//                     break;
//                 }
//             }
//             if (vinto) {
//                 break;
//             }
//         }
//     }
// }

// function controlla_diagonale(scelta) {
//     /* 
//     0 1 2
//     3 4 5
//     6 7 8
//     */
//     /*Per far si che si possa fare tris in diagonale devo partire a controllare 
//     le due caselle agli angoli in alto*/
//     if (!vinto) {
//         vinto = true;
//         for (let j = 0; j <= 8; j += 4) {
//             if (caselle[j].dataset.mossa != scelta) {
//                 vinto = false;
//                 break;
//             }
//         }
//         if (!vinto) {
//             vinto = true;
//             for (let j = 2; j <= 6; j += 2) {
//                 if (caselle[j].dataset.mossa != scelta) {
//                     vinto = false;
//                     break;
//                 }
//             }
//         }
//     }
// }