import {afficherContenu} from "./homepage.js"

// Récupération du nombre de bouton puis Injection dans le DOM
export const filtrerContenu = async() => {
    // Récupération de la liste grâce à l'API
    const reponse = await fetch ("http://localhost:5678/api/categories")
    const categorie = await reponse.json()
    // Récupérer de la Work grâce à l'API
    const requet = await fetch("http://localhost:5678/api/works/")
    let contenu = await requet.json()

    // Récupération de la div parent pour injecter mes boutons 
    const filtreBtn = document.querySelector(".filtreBtn")

    // Création de la boucle pour injecter les bouton de façon dynamique 
    for (let i = 0; i < categorie.length; i++) {
        // Création du bouton
        const bouton = document.createElement("button")
        bouton.innerText = `${categorie[i].name}`
        bouton.className = `filtreBtn-${categorie[i].id}`
        filtreBtn.appendChild(bouton)

    }
    
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

        // Si c'est le premier bouton, ajoutez la classe "btn_selected" et retire la classe "btn_unselected"
        if (j === 0) {
            filtre_Btn[j].classList.remove("btn_unselected")
            filtre_Btn[j].classList.add("btn_selected")
        }
        else {
            filtre_Btn[j].classList.add("btn_unselected")
            filtre_Btn[j].classList.remove("btn_selected")
        }
    }
    
    /////////////>>>>>>>>>>>>> SOLUTION POUR CLASS BTN UNSELECTED <<<<<<<<<<<////////
    // TOUS // 
    const btnTous = document.querySelector(".tous")
    btnTous.addEventListener("click", () => {
        document.querySelector(".gallery").innerHTML = ""
        afficherContenu()
    })
    // OBJET //
    const btnObjet = document.querySelector(".filtreBtn-1")
    btnObjet.addEventListener("click", () => {
        const contenusFiltrees = contenu.filter( function(section) {
            return section.categoryId === 1
        })
        document.querySelector(".gallery").innerHTML = ""
        majContenu(contenusFiltrees)
    })
    // APPARTEMENT //
    const btnAppartement = document.querySelector(".filtreBtn-2")
    btnAppartement.addEventListener("click", () => {
        const contenusFiltrees = contenu.filter( function(section) {
            return section.categoryId === 2
        })
        document.querySelector(".gallery").innerHTML = ""
        majContenu(contenusFiltrees)
    })
    // HOTEL & RESTAURANT //
    const btnH_R = document.querySelector(".filtreBtn-3")
    btnH_R.addEventListener("click", () => {
        const contenusFiltrees = contenu.filter( function(section) {
            return section.categoryId === 3
        })
        document.querySelector(".gallery").innerHTML = ""
        majContenu(contenusFiltrees)
    })
} 

//// Fonction qui permet de mettre à jour le contenu
const majContenu = (index) => {
    // Récupération des éléments dans le DOM
    const section_ImgTitle = document.querySelector(".gallery")
    const contenuImg = document.querySelector(".gallery img")
    const contenuTitle = document.querySelector(".gallery figcaption")
    // Parcourir tout le tableau et injecter les éléments dynamiquement dans le DOM
    for (let i=0; i < index.length; i++) {
        // Ajout de la section qui images & titre
        let figure = document.createElement("figure")
        section_ImgTitle.appendChild(figure)
        // Ajouts des images
        let image = document.createElement("img")
        image.src = index[i].imageUrl
        image.alt = index[i].title
        figure.appendChild(image)
        // Ajouts du text 
        let title = document.createElement("figcaption")
        title.innerText = index[i].title
        figure.appendChild(title)
    }
}