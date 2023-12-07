let worksData = []

import {createFilterBtn} from "./btnFiltre.js"
import {connect} from "../modale/modale.js"

// Récupération des Objets du tableau grâce à l'API
const getWorks = async () => {
    const requet = await fetch("http://localhost:5678/api/works/")
    worksData = await requet.json()
    afficherContenu()
}

// Création de la fonction qui permet l'affichage des éléments dans le DOM
export const afficherContenu = ( idCat = 0 ) => {

    // Récupération des éléments dans le DOM
    const sectionGallery = document.querySelector(".gallery")
    sectionGallery.innerHTML = ""

    let worksDataFiltre = worksData

    if ( idCat !== 0 ) {
        worksDataFiltre = worksData.filter(function (work) {
            return work.categoryId === idCat
        })
    }
    // Parcourir tout le tableau et injecter les éléments dynamiquement dans le DOM
    for (let i=0; i < worksDataFiltre.length; i++) {
        // Ajout de la section qui images & titre
        let figure = document.createElement("figure")
        sectionGallery.appendChild(figure)
        // Ajouts des images
        let image = document.createElement("img")
        image.src = worksDataFiltre[i].imageUrl
        image.alt = worksDataFiltre[i].title
        figure.appendChild(image)
        // Ajouts du text 
        let title = document.createElement("figcaption")
        title.innerText = worksDataFiltre[i].title
        figure.appendChild(title)
    }
}

getWorks()

// Lecture de la fonction qui permet de filtrée le contenu
createFilterBtn()

// Lecture de la fonction qui se trouve dans modale.js
connect()
