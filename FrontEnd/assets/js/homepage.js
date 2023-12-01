import {filtrerContenu} from "./btnFiltre.js"

// Lecture de la fonction filtre qui est exportée
filtrerContenu()

// Récupération des Objets du tableau grâce à l'API
export const afficherContenu = async () => {
    const reponse = await fetch("http://localhost:5678/api/works/")
    let contenu = await reponse.json()
    console.log(contenu)

    // Récupération des éléments dans le DOM
    const section_ImgTitle = document.querySelector(".gallery")
    const contenuImg = document.querySelector(".gallery img")
    const contenuTitle = document.querySelector(".gallery figcaption")
    // Parcourir tout le tableau et injecter les éléments dynamiquement dans le DOM
    for (let i=0; i < contenu.length; i++) {
        // Ajout de la section qui images & titre
        let figure = document.createElement("figure")
        section_ImgTitle.appendChild(figure)
        // Ajouts des images
        let image = document.createElement("img")
        image.src = contenu[i].imageUrl
        image.alt = contenu[i].title
        figure.appendChild(image)
        // Ajouts du text 
        let title = document.createElement("figcaption")
        title.innerText = contenu[i].title
        figure.appendChild(title)
    }
}
afficherContenu()

