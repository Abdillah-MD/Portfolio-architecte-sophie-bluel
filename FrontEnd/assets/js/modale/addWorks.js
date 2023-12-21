// Permet de récupérer les éléments du form renseigné par l'utilisateur
const form = document.querySelector(".ajoutWorks-form")
const tilteWork = document.querySelector("input[name=title]")
const categoryNewWork = document.getElementById("worksCategory")
const btnSubmit = document.querySelector(".modalSubmitBtn")
const inputFile = document.querySelector("input[type=file]")

import { apiAddWork } from "../api.js"
import { getWorks } from "../index/homepage.js"

// Permet de desactiver le bouton si champ vide 
const btnDisable = () => {
    if (
        inputFile.files.length !== 1 ||
        tilteWork.value === "" ||
        parseInt(categoryNewWork.value) === 0
    ) {
        btnSubmit.style.background = "#A7A7A7"
        btnSubmit.style.cursor = "not-allowed"
    } else {
        btnSubmit.style.background = "#1D6154"
        btnSubmit.style.cursor = "pointer"
    }
}

// Ecouter tous les champs pour voir si il sont remplis ou pas
const majBtnDisable = () => {
    inputFile.addEventListener("change", () => {
        btnDisable()
    })

    tilteWork.addEventListener("input", () => {
        btnDisable()
        console.log(tilteWork.value)
    })

    categoryNewWork.addEventListener("change", () => {
        btnDisable()
        console.log(categoryNewWork.value)
    })

    form.addEventListener("input", () => {
        btnDisable();
    })
    
}

// Ecouter le click sur le bouton disable
const clickBtnDisable = () => {
    btnSubmit.addEventListener("click", () => {
        if (btnSubmit.disabled === true) {
            const reussiText = document.querySelector(".modale__wrapper-2 h3")
            reussiText.innerHTML = `<h3 class="titlemodale">Ajout photo</h3><p class="textFailedToAdd"> Veuillez renseignr tous les champs<p>`
        }
    })
}

// Ecouter le submit du formulaire  |||| sessionStorage.getItem("imageBase64")
const onSubmitFormModale = () => {
    form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const formData = new FormData()
    
        formData.append("image", inputFile.files[0])
        formData.append("title", tilteWork.value)
        formData.append("category", parseInt(categoryNewWork.value))
    
        console.log(formData.get("image"))
        console.log(typeof parseInt(categoryNewWork.value))
    
        await apiAddWork(formData)
        btnDisable()
        getWorks()
    
    })
}


// Fonction exporter dans le fichier admin pour pouvoir lire toutes les f° dans le index.html 
export const addNewWork = () => {
    onSubmitFormModale()
    btnDisable()
    majBtnDisable()
}