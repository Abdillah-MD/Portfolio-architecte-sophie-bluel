// Récupération du nombre de bouton puis Injection dans le DOM
export const filtrerContenu = async() => {
    // Récupération de la liste grâce à l'API
    const reponse = await fetch ("http://localhost:5678/api/categories")
    const categorie = await reponse.json()

    // Récupération de la div parent pour injecter mes boutons 
    const filtreBtn = document.querySelector(".filtreBtn")

    // Création de la boucle pour injecter les bouton de façon dynamique 
    for (let i = 0; i < categorie.length; i++) {
        // Création du bouton
        const bouton = document.createElement("button")
        bouton.innerText = `${categorie[i].name}`
        bouton.className = `${categorie[i].id}`
        filtreBtn.appendChild(bouton)
    }
    
    // Récupérer tous les bouton pour mettre à jour l'état selected 
    const filtre_Btn = document.querySelectorAll(".filtreBtn button")
    console.log(filtre_Btn)
    let j = 0
    let index = 1
    filtre_Btn[j].classList.add("btn_selected")
    for (let index = 0; index < filtre_Btn.length; index++) {
        if (j != index) {
            filtre_Btn[index].classList.add("btn_unselected")

        }
    }
    /////////////>>>>>>>>>>>>> SOLUTION POUR CLASS BTN UNSELECTED <<<<<<<<<<<////////

}

