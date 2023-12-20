let worksData = []

import { deleteWork } from "../api.js"
import {createFilterBtn} from "./btnFiltre.js"

// Récupération des Objets du tableau grâce à l'API
const getWorks = async () => {
    const requet = await fetch("http://localhost:5678/api/works/")
    worksData = await requet.json()
    afficherContenu()
}

// Création de la fonction qui permet l'affichage des éléments dans le DOM
export const afficherContenu = ( idCat = 0 ) => {

    // Récupération des éléments dans le DOM
    const modaleWorks = document.getElementById("works")
    const sectionGallery = document.querySelector(".gallery")
    sectionGallery.innerHTML = ""
    modaleWorks.innerHTML = ""

    let worksDataFiltre = worksData

    if ( idCat !== 0 ) {
        worksDataFiltre = worksData.filter(function (work) {
            return work.categoryId === idCat
        })
    }
    // Parcourir tout le tableau et injecter les éléments dynamiquement dans le DOM
    for (let i=0; i < worksDataFiltre.length; i++) {
        // Ajout de la section qui images & titre
        let figureGallery = document.createElement("figure")
        sectionGallery.appendChild(figureGallery)

        let figureModale = document.createElement("figure")
        modaleWorks.appendChild(figureModale)

        ///////////////// POUR Gallery ////////////////
        let imageGallery = document.createElement("img")
        imageGallery.src = worksDataFiltre[i].imageUrl
        imageGallery.alt = worksDataFiltre[i].title
        figureGallery.appendChild(imageGallery)
        // Ajouts du text 
        let title = document.createElement("figcaption")
        title.innerText = worksDataFiltre[i].title
        figureGallery.appendChild(title)
        /////////////////////////////////////////////////

        //////////////// POUR Modale ///////////////////
        let imageModale = document.createElement("img")
        imageModale.src = worksDataFiltre[i].imageUrl
        imageModale.alt = worksDataFiltre[i].title
        figureModale.appendChild(imageModale)

        let suppBtn = document.createElement("i")
        suppBtn.innerHTML = `<i class="fa-solid fa-trash-can"></i>`
        suppBtn.className = "supprimerWorks"

        suppBtn.addEventListener("click", () => {
            console.log(i)
            console.log(worksDataFiltre[i].id)
            
            // Boîte de confirmation 
            if ( confirm(`Êtes vous sûr de vouloir supprimer " ${worksDataFiltre[i].title} " ? `) === true) {
                // Si ok alors travaille supprimer
                deleteWork(worksDataFiltre[i].id)
                getWorks()
            }

            else {
                // ne rien faire
            }
        })

        figureModale.appendChild(suppBtn)
        
        ////////////////////////////////////////////////:
    }

    // const suppBtn = document.querySelectorAll(".supprimerWorks")

    // Appelle de la fonction supprimer élément
    // deleteWork(suppBtn, worksDataFiltre)
    
}

getWorks()

// Lecture de la fonction qui permet de filtrée le contenu
createFilterBtn()
