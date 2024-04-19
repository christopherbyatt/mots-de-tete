/** WORDLE version TIMCSF
 *  à la suite du "bonhomme pendu" de Michelle Decorte... ;)
 * @author Ève Février, efevrier@csfoy.ca
 * @todo DES TONNES d'améliorations possibles... FAITES VOS SUGGESTIONS!!!
 * (0) optimiser l'algorithme!
 * (1) ajouter des niveaux de difficultés selon la liste utilisée (faire une liste facile avec des mots très courants...)
 * (2) ajouter un bouton aide qui fournit un indice pour chaque mot (modifier en conséquence la structure de données)
 * (3) ajouter des animations de transition lorsqu'on Rejoue
 * */

// function afficherCacher(strId, blnIsHidden) {
//     document.getElementById(strId).hidden = blnIsHidden;
// }

let jeuxMots = {
    strMotHasard: null,
    intNombreEssai: 0,
    getMotAleatoire: async function () {
        try {
            const response = await fetch("https://api.dicolink.com/v1/mots/motauhasard?avecdef=true&minlong=5&maxlong=5&verbeconjugue=false&api_key=vIZN5M213LnPy5M8isceExH5sYNBg35h");
            const data = await response.json();
            this.strMotHasard = data[0].mot;
            console.log(this.strMotHasard);
        } catch (error) {
            console.error("Erreur lors de la récupération du mot aléatoire :", error);
        }
    },
    pigerMot: async function () {
        document.getElementById("btnJouer").disabled = true;

        await this.getMotAleatoire();
        // afficherCacher("etape2", false);
    },
    evaluerMot: function (strMotAEvaluer) {
        strMotAEvaluer = strMotAEvaluer.toLowerCase();
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

            }
            // donner une rétroaction
            if (strMotAEvaluer === this.strMotHasard) {

                console.log()
                document.getElementById("btnEvaluer").disabled = true;
                document.getElementById("btnReset").disabled = false;
            }
            if (this.intNombreEssai === 6) {
                document.getElementById("btnEvaluer").disabled = true;
                document.getElementById("btnReset").disabled = false;
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

        // Gérer l'état des boutons
        document.getElementById("btnJouer").disabled = false;
        document.getElementById("btnReset").disabled = true;
        document.getElementById("btnEvaluer").disabled = false;
        document.getElementById("btnReset").className = "";
        // afficherCacher("etape2", true);
    }

};
// utiliser DOMContentLoaded plutôt que load
// https://developer.mozilla.org/fr/docs/Web/API/Window/DOMContentLoaded_event
window.addEventListener("DOMContentLoaded", function () {
    document.getElementById("btnJouer").className = "animate animate__jello";
})
document.getElementById("btnJouer").addEventListener("click", function () {
    jeuxMots.pigerMot();
})
document.getElementById("btnEvaluer").addEventListener("click", function () {
    let strMot = document.getElementById("mot").value;
    jeuxMots.evaluerMot(strMot);
})
document.getElementById("btnReset").addEventListener("click", function () {
    jeuxMots.reset();
})
// choix de remplacer <form> par div.form plutôt que:
/* document.getElementById("champMot").addEventListener("keyup", function(objEvenement){
    if(objEvenement.key == "Enter"){
        objEvenement.preventDefault();
    }
}) */
 