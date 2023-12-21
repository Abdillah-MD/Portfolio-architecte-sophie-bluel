// Permet d'envoyer la requête à l'API pour avoir l'autorisation de supprimer
export const deleteWork = async (id) => {
    const request = await fetch (`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {"Authorization": `Bearer ${sessionStorage.getItem("token")}`}
    })
}

// Appelle API pour avoir l'autorisation de poster un nouveau work
export const apiAddWork = async (formData, btnDisable) => {
    try {
        const request = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
             },
            body: formData
        })

        const reponse = await request.json()
        console.log("Réussite :", reponse)

        const reussiText = document.querySelector(".modale__wrapper-2 h3")

        // Gérer la réussite d'envoie
        if (request.status === 201 ) {
            reussiText.innerHTML = `<h3 class="titlemodale importationSucces">Importation réussie !</h3><p class="textSuccesAdd"> Importer une nouvelle photo<p>`

            // Récupération des éléments form du DOM
            const parent = document.querySelector(".ajoutPhoto")
            const previewImage = document.querySelector(".ajoutPhoto img")
            const formulaireModale = document.querySelector(".ajoutWorks-form")
            const formLabel = document.querySelector("label[for=ajoutPhotoFile]")
            const formatFileText = document.querySelector(".ajoutPhoto p")

            previewImage.src = "./assets/icons/picture-svgrepo-com1.svg"
            previewImage.style.cssText = "width: auto; height: auto; display: inline"
            parent.insertBefore(previewImage, parent.firstChild)
            formLabel.style.display = "block"
            formatFileText.style.display = "block"
            formulaireModale.reset()

        } 
        // Gérer le code : Bad request du serveur
        else if (request.status === 400 ) {
            reussiText.innerHTML = `<h3 class="titlemodale importationFailed">Importation échoué !</h3><p class="textFailedToAdd"> Vueillez renseigner tous les champs !<p>`
        } 
        // Gérer le code : Unauthorized du serveur
        else if (request.status === 401 ) {
            reussiText.innerHTML = `<h3 class="titlemodale importationFailed">Importation échoué !</h3><p class="textErrorToAdd"> Vueillez vous reconnecter !<p>`
        } 
        // Gérer le code : Unexpected Error du serveur
        else if (request.status === 500) {
            reussiText.innerHTML = `<h3 class="titlemodale importationFailed">Importation échoué !</h3><p class="textErrorToAdd"> Vueillez renseigner tous les champs !<p>`
        }

    } catch (error) {
        console.log("Une erreur s'est produite" + error)
    }
    
}