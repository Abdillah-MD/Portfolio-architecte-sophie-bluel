import { isLogin } from "./admin.js"
import {afficherContenu} from "./homepage.js"

// Récupération du nombre de bouton puis Injection dans le DOM
export const createFilterBtn = async() => {
    // Récupération de la liste grâce à l'API
    const reponse = await fetch ("http://localhost:5678/api/categories")
    let categorie = await reponse.json()

    // Ajout du bouton Tous dans le tableau catégorie récupéré
    categorie.splice(0, 0, {id:0, name: 'Tous'})
    console.log(categorie)
    // Récupération de la div parent pour injecter mes boutons 
    const filtreBtn = document.querySelector(".filtreBtn")

    
    if ( isLogin === false ) {
        // Création de la boucle pour injecter les bouton de façon dynamique 
        for (let i = 0; i < categorie.length; i++) {
            // Création du bouton
            const bouton = document.createElement("button")
            bouton.innerText = `${categorie[i].name}`

            // Permet de mettre le btn slected dès le chargement de la page
            if (i === 0) {
                bouton.className = "btn_selected"
            }
            else {
                bouton.className = "btn_unselected"
            }

            // Ecoute du click pour pouvoir afficher les élément par Catégorie
            bouton.addEventListener("click", () => {
                afficherContenu(categorie[i].id)
                console.log(bouton)
            })
            
            filtreBtn.appendChild(bouton)

        }
    } 
    else {
        filtreBtn.innerHTML = ""
        document.querySelector("#portfolio").style.margin = "70px auto 70px auto"
    }

    btnFiltreStyle()
    
} 

// Fonction qui permet de styliser les btn selected ou unselected 
const btnFiltreStyle = () => {
    // Récupérer tous les bouton pour mettre à jour l'état selected 
    const filtre_Btn = document.querySelectorAll(".filtreBtn button")

    for (let j = 0; j < filtre_Btn.length; j++) {
        filtre_Btn[j].addEventListener("click", function() {
            // Supprimer la classe "btn_selected" de tous les boutons
            for (let index = 0; index < filtre_Btn.length; index++) {
                filtre_Btn[index].classList.remove("btn_selected")
                filtre_Btn[index].classList.add("btn_unselected")
            }

            // Ajouter la classe "btn_selected" uniquement au bouton cliqué
            this.classList.remove("btn_unselected");
            this.classList.add("btn_selected");
        });

    }
}