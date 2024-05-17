/** WORDLE version TIMCSF
 *  à la suite du "bonhomme pendu" de Michelle Decorte... ;)
 * @author Ève Février, efevrier@csfoy.ca
 * @todo DES TONNES d'améliorations possibles... FAITES VOS SUGGESTIONS!!!
 * (0) optimiser l'algorithme!
 * (1) ajouter des niveaux de difficultés selon la liste utilisée (faire une liste facile avec des mots très courants...)
 * (2) ajouter un bouton aide qui fournit un indice pour chaque mot (modifier en conséquence la structure de données)
 * (3) ajouter des animations de transition lorsqu'on Rejoue
 * */
let btnRegles = document.getElementById("menuRegle");
let btnRegles2 = document.getElementById("btnRegle");
let btnDiff = document.getElementById("btnDifficulte");
let body = document.querySelector("body");
let bonMot = document.getElementById("bonMot");
let modaleReussis = document.getElementById("modaleReussis");
let modaleEchec = document.getElementById("modaleEchec");
let modal = document.getElementById("modalRegles");
let modalDiff = document.getElementById("modalDifficulte");


btnRegles.onclick = function () {
    modal.style.display = "block";
    body.style.overflow = "hidden"
}
btnRegles2.onclick = function () {
    modal.style.display = "block";
    body.style.overflow = "hidden"
}
btnDiff.onclick = function () {
    modalDiff.style.display = "block"
    body.style.overflow = "hidden"
}
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
        body.style.overflow = "visible"
    }
    if (event.target === modalDiff) {
        modalDiff.style.display = "none";
        body.style.overflow = "visible"
    }
}
const radios = document.querySelectorAll('input[name="difficulte"]');
const spanDifficulte = document.getElementById('difficulte');

radios.forEach(radio => {
    radio.addEventListener('change', function() {
        // Mettez à jour le contenu du span avec la valeur du label sélectionné
        const label = document.querySelector(`label[for="${this.id}"]`);
        spanDifficulte.textContent = label.textContent;
    });
});
const labelChecked = document.querySelector('input[name="difficulte"]:checked + label');
spanDifficulte.textContent = labelChecked.textContent;
document.querySelectorAll('.modal .close').forEach(function(element) {
    element.addEventListener('click', function() {
        this.closest('.modal').style.display = 'none';
        body.style.overflow = 'visible';
    });
});
document.querySelectorAll('.modalDifficulte .close').forEach(function(element) {
    element.addEventListener('click', function() {
        this.closest('.modalDifficulte').style.display = 'none';
        body.style.overflow = 'visible';
    });
});

function afficherModaleReussis() {
    let boutonsDifficulte = document.getElementsByName("difficulteReussis");
    boutonsDifficulte.forEach(bouton => bouton.checked = false);
    modaleReussis.style.display = "block";
    body.style.overflow = "hidden"
    document.getElementById("essais").innerText = jeuxMots.intNombreEssai;
    let difficulteSpan = document.getElementById("difficulte");
    let difficulteLabel = document.querySelector('input[name="difficulte"]:checked + label');
    difficulteSpan.innerText = difficulteLabel.innerText;
}

function AfficherModaleEchec() {
    let boutonsDifficulte = document.getElementsByName("difficulteEchec");
    boutonsDifficulte.forEach(bouton => bouton.checked = false);
    modaleEchec.style.display = "block";
    body.style.overflow = "hidden"
    let difficulteSpan = document.getElementById("difficulte");
    let difficulteLabel = document.querySelector('input[name="difficulte"]:checked + label');
    difficulteSpan.innerText = difficulteLabel.innerText;
}

function retraitAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function mettreAJourLongueurMot(difficulte) {
    let motInput = document.getElementById("mot");
    switch (difficulte) {
        case '1': // Facile
            motInput.setAttribute("minlength", "5");
            motInput.setAttribute("maxlength", "5");
            break;
        case '2': // Intermédiaire
            motInput.setAttribute("minlength", "7");
            motInput.setAttribute("maxlength", "7");
            break;
        case '3': // Difficile
            motInput.setAttribute("minlength", "8");
            motInput.setAttribute("maxlength", "8");
            break;
        default:
            // Par défaut, utilisez la difficulté facile
            motInput.setAttribute("minlength", "5");
            motInput.setAttribute("maxlength", "5");
            break;
    }
}

let jeuxMots = {
    strMotHasard: null,
    intNombreEssai: 0,
    motsConsecutifsReussis: 0,

    getMotAleatoire: async function () {
        let difficulte = document.querySelector('input[name="difficulte"]:checked').value;


        if (difficulte === "1") {
            try {
                const response = await fetch("https://api.dicolink.com/v1/mots/motauhasard?avecdef=true&minlong=5&maxlong=5&verbeconjugue=false&api_key=vIZN5M213LnPy5M8isceExH5sYNBg35h");
                const data = await response.json();
                this.strMotHasard = retraitAccents(data[0].mot);
                console.log(this.strMotHasard);
            } catch (error) {
                console.error("Erreur lors de la récupération du mot aléatoire :", error);
            }

        } else if (difficulte === "2") {

            try {
                const response = await fetch("https://api.dicolink.com/v1/mots/motauhasard?avecdef=true&minlong=7&maxlong=7&verbeconjugue=false&api_key=vIZN5M213LnPy5M8isceExH5sYNBg35h");
                const data = await response.json();
                this.strMotHasard = retraitAccents(data[0].mot);
                console.log(this.strMotHasard);
            } catch (error) {
                console.error("Erreur lors de la récupération du mot aléatoire :", error);
            }
        } else {
            try {
                const response = await fetch("https://api.dicolink.com/v1/mots/motauhasard?avecdef=true&minlong=8&maxlong=8&verbeconjugue=false&api_key=vIZN5M213LnPy5M8isceExH5sYNBg35h");
                const data = await response.json();
                this.strMotHasard = retraitAccents(data[0].mot);
                console.log(this.strMotHasard);
            } catch (error) {
                console.error("Erreur lors de la récupération du mot aléatoire :", error);
            }
        }
    },
    pigerMot: async function () {
        await this.getMotAleatoire();
        document.getElementById("btnEvaluer").disabled = false;
    },

    evaluerMot: function (strMotAEvaluer) {
        strMotAEvaluer = strMotAEvaluer.toLowerCase();
        let minLength = parseInt(document.getElementById("mot").getAttribute("minlength"));
        if (strMotAEvaluer.length === 0) {
            document.getElementById('erreur').innerText = "Veuillez inscrire un mot svp"
            console.log("Veuillez inscrire un mot svp")
            return;
        }
        if (strMotAEvaluer.length < minLength && strMotAEvaluer.length !== 0) {
            document.getElementById('erreur').innerText = "La longueur minimale du mot n'a pas été atteinte"
            console.log("La longueur minimale du mot n'a pas été atteinte");
            return;
        }
        if (strMotAEvaluer.length === minLength) {
            document.getElementById('erreur').innerText = ""
        }
        document.getElementById("mot").value = ""

        if (strMotAEvaluer !== "" && this.intNombreEssai < 6) {
            this.intNombreEssai += 1;
            for (let intCpt = 0; intCpt < strMotAEvaluer.length; intCpt++) {
                let tagSpan = document.querySelector(
                    `#mot${this.intNombreEssai} span:nth-of-type(${intCpt + 1})`);
                let strLettre = strMotAEvaluer.charAt(intCpt);
                tagSpan.innerText = strLettre;
                if (this.strMotHasard.indexOf(strLettre) !== -1) {
                    if (strMotAEvaluer.charAt(intCpt) === this.strMotHasard.charAt(intCpt)) {
                        tagSpan.classList.add("vert", "info")
                    } else {
                        tagSpan.classList.add("jaune", "info")
                    }
                } else {
                    tagSpan.className = "gris";
                }
                if (strMotAEvaluer === this.strMotHasard) {
                    document.getElementById("btnEvaluer").disabled = true;
                    afficherModaleReussis();

                }
                if (this.intNombreEssai === 6 && strMotAEvaluer !== this.strMotHasard) {
                    document.getElementById("btnEvaluer").disabled = true;
                    AfficherModaleEchec();
                    bonMot.innerHTML = this.strMotHasard;
                }
            }
            if (strMotAEvaluer === this.strMotHasard) {
                this.motsConsecutifsReussis+= 1;
                document.getElementById("trouvés").innerText = this.motsConsecutifsReussis;
            } else {
                this.motsConsecutifsReussis = 0;
            }
        }
    },
    reset: function () {
        let arrSpan = document.querySelectorAll(".mot span");
        for (let intCpt = 0; intCpt < arrSpan.length; intCpt++) {
            arrSpan[intCpt].innerText = "";
            arrSpan[intCpt].className = "";
        }
        this.intNombreEssai = 0;
        document.getElementById("mot").value = "";
        jeuxMots.pigerMot()
    },
    changerDif: function () {
        let difficulteMod = document.querySelector('input[name="difficulteMod"]:checked').value;
        let nouveauBoutonDifficulte = document.querySelector(`input[name="difficulte"][value="${difficulteMod}"]`);
        nouveauBoutonDifficulte.checked = true;
        jeuxMots.updateSpanCount()
        jeuxMots.reset()
        document.getElementById('erreur').innerText = ""
        let difficulteSpan = document.getElementById("difficulte");
        let difficulteLabel = document.querySelector(`input[name="difficulteMod"]:checked + label`);
        difficulteSpan.innerText = difficulteLabel.innerText;
        document.getElementById("choixReussis").innerText = ""
    },
    changerDifReussis: function () {
        let difficulteModReussis = document.querySelector('input[name="difficulteReussis"]:checked').value;
        let nouveauBoutonDifficulteReussis = document.querySelector(`input[name="difficulte"][value="${difficulteModReussis}"]`)
        nouveauBoutonDifficulteReussis.checked = true;
        jeuxMots.updateSpanCount();
        mettreAJourLongueurMot(difficulteModReussis);
        let nouveauBoutonDifficulteModal = document.querySelector(`input[name="difficulteMod"][value="${difficulteModReussis}"]`);
        nouveauBoutonDifficulteModal.checked = true;
        jeuxMots.reset();
        let difficulteSpan = document.getElementById("difficulte");
        let difficulteLabel = document.querySelector(`input[name="difficulteMod"]:checked + label`);
        difficulteSpan.innerText = difficulteLabel.innerText;
        document.getElementById("choixReussis").innerText = ""
    },
    changerDifEchec: function () {
        let difficulteModEchec = document.querySelector('input[name="difficulteEchec"]:checked').value;
        let nouveauBoutonDifficulteEchec = document.querySelector(`input[name="difficulte"][value="${difficulteModEchec}"]`);
        nouveauBoutonDifficulteEchec.checked = true;
        jeuxMots.updateSpanCount();
        mettreAJourLongueurMot(difficulteModEchec);
        let nouveauBoutonDifficulteModal = document.querySelector(`input[name="difficulteMod"][value="${difficulteModEchec}"]`);
        nouveauBoutonDifficulteModal.checked = true;
        jeuxMots.reset();
        let difficulteSpan = document.getElementById("difficulte");
        let difficulteLabel = document.querySelector(`input[name="difficulteMod"]:checked + label`);
        difficulteSpan.innerText = difficulteLabel.innerText;
        document.getElementById("choixEchec").innerText = ""

    },
    updateSpanCount: function () {
        let difficulty = document.querySelector('input[name="difficulte"]:checked').value;
        let motList = document.querySelectorAll('.jeu__liste li');
        let spanCount;
        switch (difficulty) {
            case '1': // Facile
                spanCount = 5;
                break;
            case '2': // Intermédiaire
                spanCount = 7;
                break;
            case '3': // Difficile
                spanCount = 8;
                break;
            default:
                spanCount = 5; // Par défaut à facile si la difficulté est invalide
                break;
        }
        motList.forEach(mot => {
            let pMot = mot.querySelector('.mot');
            pMot.innerHTML = '';

            for (let i = 0; i < spanCount; i++) {
                let span = document.createElement('span');
                pMot.appendChild(span);
            }
        });
    },
};
window.addEventListener("DOMContentLoaded", function () {
})
document.getElementById("menuCommencer").addEventListener("click", function () {
    let boutonMenu = document.getElementsByName('difficulte');
    let boutonMod = document.getElementsByName('difficulteMod');
    for (let i = 0; i < boutonMenu.length; i++) {
        if (boutonMenu[i].checked) {
            boutonMod[i].checked = true
        }
    }
    document.querySelector('.menu').style.display = "none";
    document.querySelector('.motsDeTete').style.display = "flex";
    jeuxMots.pigerMot();
});
document.getElementById("btnEvaluer").addEventListener("click", function () {
    let strMot = document.getElementById("mot").value;
    jeuxMots.evaluerMot(strMot);
});
document.getElementById("mot").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        jeuxMots.evaluerMot(this.value);
    }
});
document.getElementById("btnReset").addEventListener("click", function () {
    jeuxMots.reset();
});
let boutonsDiff = document.getElementsByName('difficulte');
for (let i = 0; i < boutonsDiff.length; i++) {
    boutonsDiff[i].addEventListener('change', function () {
        let difficulte = this.value;
        mettreAJourLongueurMot(difficulte);
        jeuxMots.updateSpanCount();
    });
}
let boutonsDiffModal = document.getElementsByName('difficulteMod');
for (let i = 0; i < boutonsDiffModal.length; i++) {
    boutonsDiffModal[i].addEventListener('change', function () {
        let difficulte = this.value;
        mettreAJourLongueurMot(difficulte);
        jeuxMots.updateSpanCount();
        jeuxMots.changerDif();
    });
}
let boutonDiffReussis = document.getElementsByName("difficulteReussis");
for (let i = 0; i < boutonDiffReussis.length; i++) {
    boutonDiffReussis[i].addEventListener('change', function () {
        let difficulte = this.value;
        mettreAJourLongueurMot(difficulte);
        jeuxMots.updateSpanCount();
        jeuxMots.changerDifReussis()
        document.getElementById("choixReussis").innerText = ""
    });
}
let boutonDiffEchec = document.getElementsByName("difficulteEchec");
for (let i = 0; i < boutonDiffEchec.length; i++) {
    boutonDiffEchec[i].addEventListener('change', function () {
        let difficulte = this.value;
        mettreAJourLongueurMot(difficulte);
        jeuxMots.updateSpanCount();
        jeuxMots.changerDifEchec();
        document.getElementById("choixEchec").innerText = ""
    })
}
document.getElementById("btnDiffReussis").addEventListener("click", function () {
    let diffReussis = document.querySelector('input[name="difficulteReussis"]:checked');
    if (diffReussis) {
        modaleReussis.style.display = 'none';
        body.style.overflow = 'visible'
    } else {
        document.getElementById("choixReussis").innerText = "veuiller choisir une difficulté svp"
    }
})

document.getElementById("btnDiffEchec").addEventListener("click", function () {
    let diffEchec = document.querySelector('input[name="difficulteEchec"]:checked')
    if (diffEchec) {
        modaleEchec.style.display = 'none';
        body.style.overflow = 'visible'
    } else {
        document.getElementById("choixEchec").innerText = "veuiller choisir une difficulté svp"
    }
})
jeuxMots.updateSpanCount();