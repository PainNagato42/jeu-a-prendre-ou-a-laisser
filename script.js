/********************************************/
/*          RECUPERATION DU DOM            */
/******************************************/
const divContainBox = document.getElementById("contain_box");
const boxs = document.querySelectorAll(".box");
const gains = document.querySelectorAll(".gain");
const message = document.getElementById("message");
const popup = document.querySelector(".popup");
const popupBanquier = document.querySelector(".popup_banquier");
const popupOffreAccepter = document.querySelector(".popup_offre_accepter");
const offreBanquier = document.getElementById("offre_banquier");
const btnAccepterOffre = document.querySelector(".btn_accepter_offre");
const btnAccepterEchange = document.querySelector(".btn_accepter_echange");
const btnRefuser = document.querySelector(".btn_refuser");
const btnPlaisir = document.querySelector(".btn_plaisir");
const btnRejouer = document.querySelectorAll(".rejouer");
const textBox = document.getElementById("text_box");
const textGain = document.getElementById("text_gain");
const textOffreGain = document.getElementById("text_offre_gain");
const mask = document.querySelector(".mask");

/*****************************************************/
/*                  VARIABLE                        */
/***************************************************/
var nbChoisi = false;
var nbTour = 0;
var reste = 5;
var offreChoisi = false;
var offreGain = 0;


tabBox = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
]

tabBoxResultat = genereGainAleatoire([]);

/*************************************************/

boxs.forEach(box => {
    box.addEventListener("click", () => {
        var dataTab = box.getAttribute("data-tab");
        if (!nbChoisi && box.classList.contains("desactivate_box") || !nbChoisi && box.classList.contains("active_echange")) {
            infoMessage("echange");
        } else {
            infoMessage("reste");
        }
        if (nbTour >= 22 && !box.classList.contains("active") && !box.classList.contains("active_echange") && !box.classList.contains("desactivate_box")) {
            infoMessage("dernier");
        }
        if (!nbChoisi && !box.classList.contains("desactivate_box")) {
            if (!box.classList.contains("active_echange")) {
                boxs.forEach(box2 => {
                    box2.classList.remove("active_echange");
                })
                box.classList.add("active");
                nbChoisi = true
            }
        } else {
            var ligne = dataTab.substr(0, 1);
            var colonne = dataTab.substr(2, 1);

            tabBox[ligne][colonne] = tabBoxResultat[ligne][colonne];
            if (!box.classList.contains("desactivate_box") && !box.classList.contains("active_echange") && !box.classList.contains("active")) {
                nbTour++;
                reste--;
                if (!offreChoisi) {
                    infoMessage("reste");
                } else {
                    infoMessage("plaisir");
                }
                if (nbTour >= 22 && !offreChoisi) {
                    infoMessage("dernier");
                }
                if (tabBox[ligne][colonne] !== 0) {
                    box.classList.add("desactivate_box")
                }
                gains.forEach(gain => {
                    if (tabBox[ligne][colonne] == gain.getAttribute("data-id")) {
                        popup.style.display = "block";
                        popup.classList.add("anim_scale");
                        mask.style.display = "block";
                        textBox.textContent = box.textContent;
                        setTimeout(() => {
                            textBox.classList.add("anim_top");
                        }, 1200)
                        setTimeout(() => {
                            textGain.textContent = gain.textContent;
                        }, 2600)
                        setTimeout(() => {
                            popup.style.display = "none";
                            popup.classList.remove("anim_scale");
                            mask.style.display = "none";
                            textGain.textContent = "";
                            textBox.classList.remove("anim_top");
                            gain.classList.add("desactivate_gain");

                        }, 4000);
                        setTimeout(() => {
                            if (nbTour == 23) {
                                gains.forEach(gain => {
                                    if (!gain.classList.contains("desactivate_gain")) {
                                        popup.style.display = "block";
                                        popup.style.backgroundColor = "rgb(206, 176, 9)";
                                        popup.classList.add("anim_scale");
                                        mask.style.display = "block";
                                        btnRejouer.forEach(rejouer => {
                                            rejouer.style.display = "block";
                                        })
                                        textBox.classList.add("text_box");
                                        if (!offreChoisi) {
                                            textBox.textContent = "Vous avez gagné";
                                            textGain.textContent = gain.textContent;
                                        } else {
                                            textBox.textContent = "Votre numero contenait";
                                            textBox.style.fontSize = "29px";
                                            textGain.textContent = gain.textContent;
                                        }

                                    }
                                })
                            }
                        }, 4100)
                        setTimeout(() => {
                            var randomBanquier = Math.floor(Math.random() * 3) + 1;
                            switch (nbTour) {
                                case 5:
                                    messageBanquier(5, 5, randomBanquier);
                                    break;
                                case 10:
                                    messageBanquier(3, 3, randomBanquier);
                                    break;
                                case 13:
                                    messageBanquier(2, 3, randomBanquier);
                                    break;
                                case 16:
                                    messageBanquier(2, 3, randomBanquier);
                                    break;
                                case 19:
                                    messageBanquier(2, 3, randomBanquier);
                                    break;
                                case 22:
                                    messageBanquier(1, 0, randomBanquier);
                                    break;
                                default:
                                    break;
                            }
                        }, 4100)
                    }
                })
            } else {
                if (nbTour >= 22 && nbChoisi) {
                    infoMessage("dernier");
                }
                if (offreChoisi) {
                    infoMessage("plaisir");
                }
            }
        }
    })
})

/****************************************************/
/*                  EVENEMENT BTN                  */
/**************************************************/

btnRefuser.addEventListener("click", () => {
    popupBanquier.style.display = "none";
    popupBanquier.classList.add("anim_scale");
    mask.style.display = "none";
    if (!offreChoisi && nbTour < 22) {
        infoMessage("reste");
    } else {
        infoMessage("dernier");
    }
    if (offreChoisi) {
        infoMessage("plaisir");
    }
})

btnAccepterOffre.addEventListener("click", () => {
    popupBanquier.style.display = "none";
    popupBanquier.classList.add("anim_scale");
    popupOffreAccepter.style.display = "block";
    popupOffreAccepter.classList.add("anim_scale");
    btnRejouer.forEach(rejouer => {
        rejouer.style.display = "block";
    })
    textOffreGain.textContent = offreGain + "€";

})

btnPlaisir.addEventListener("click", () => {
    popupOffreAccepter.style.display = "none";
    mask.style.display = "none";
    popupOffreAccepter.classList.remove("anim_scale");
    btnRejouer.forEach(rejouer => {
        rejouer.style.display = "none";
    })
    offreChoisi = true;
    infoMessage("plaisir");
})

btnAccepterEchange.addEventListener("click", () => {
    popupBanquier.style.display = "none";
    popupBanquier.classList.remove("anim_scale");
    mask.style.display = "none";
    btnAccepterOffre.style.display = "block";
    btnAccepterEchange.style.display = "none";
    nbChoisi = false;
    boxs.forEach(box => {
        if (box.classList.contains("active")) {
            box.classList.remove("active");
            box.classList.add("active_echange");
        }
    })
    infoMessage("echange");
})

/*********************************************************/
/*                  FONCTIONS                           */
/*******************************************************/

function genereGainAleatoire(array) {
    var tab = array;
    var randomGain = Math.floor(Math.random() * 24) + 1;

    if (tab.length < 24) {
        if (!tab.includes(randomGain)) {
            tab.push(randomGain);
            genereGainAleatoire(tab);
        }
        genereGainAleatoire(tab);
    }
    finalTab = []
    var nb = 0;
    for (let i = 0; i < 6; i++) {
        finalTab.push(tab.slice(nb, nb + 4));
        nb = nb + 4;
    }

    return finalTab;

}
function infoMessage(info) {

    switch (info) {
        case "reste":
            message.textContent = "Choisissez un numéro à retirer, il vous en reste " + reste + " avant l'offre du banquier";
            break;
        case "dernier":
            message.textContent = "Choisissez le dernier numéro à retirer";
            break;
        case "plaisir":
            message.textContent = "Mode pour le plaisir";
            break;
        case "echange":
            message.textContent = "Choisissez un numéro pour l'échange";
            break;
        default:
            break;
    }

}


function calculBanquier() {
    var tabGainRestant = [];
    var sommeTab = 0;
    gains.forEach(gain => {
        if (!gain.classList.contains("desactivate_gain")) {
            tabGainRestant.push(parseFloat(gain.getAttribute("data-gain")));
        }
    })
    for (let i = 0; i < tabGainRestant.length; i++) {
        sommeTab += tabGainRestant[i];
    }
    var result = sommeTab / tabGainRestant.length;

    if (result > 1) {
        return Math.round(result);
    } else {
        return 1;
    }

}

function messageBanquier(nbPourDevise, nbReste, randomBanquier) {
    if (randomBanquier < 3) {
        var offre = calculBanquier() / nbPourDevise;
        offre = Math.round(offre);
        offreBanquier.textContent = offre + "€";
        popupBanquier.style.display = "block";
        popupBanquier.classList.add("anim_scale");
        mask.style.display = "block";
        reste = nbReste
        offreGain = offre;
        if (offreChoisi) {
            btnAccepterOffre.style.display = "none";
            btnRefuser.textContent = "Fermer";
            btnRefuser.style.backgroundColor = "rgb(123, 182, 237)";

        }
    } else {
        popupBanquier.style.display = "block";
        popupBanquier.classList.add("anim_scale");
        mask.style.display = "block";
        btnAccepterOffre.style.display = "none";
        btnAccepterEchange.style.display = "block";
        offreBanquier.textContent = "Échange de numéro";
        offreBanquier.style.fontSize = "50px";
        reste = nbReste
        if (offreChoisi) {
            btnAccepterEchange.style.display = "none";
            btnRefuser.textContent = "Fermer";
            btnRefuser.style.backgroundColor = "rgb(123, 182, 237)";
        }
    }

}
