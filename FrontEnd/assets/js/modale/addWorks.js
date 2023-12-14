// Appelle API pour avoir l'autorisation de poster un nouveau work
const addWork = async (newWork) => {
    const request = await fetch ("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {"Authorization": `Bearer ${sessionStorage.getItem("token")}`},
        body: JSON.stringify(newWork)
    })
}

// Récupère les éléments du formaulaire de la modale 
const valueFormModale = (valueBody) => {
    const fileInput = document.querySelector("input[type=file]")
    const fileSelected = fileInput.files[0]

    const titleWork = document.querySelector("input[id=titre]")

    const categoryNewWork = document.getElementById("worksCategory")

    const valueBody = [
        {
            "id": 1,
            "title": `${titleWork.value}`,
            "imageUrl": `http://localhost:5678/images/${imageUrl}`,
            "categoryId": quelleCategorieId(),
            "userId": 1,
            "category": {
              "id": `${value.categoryId}`,
              "name": `${categoryNewWork.value}`
            }
          }
    ]
}

// Permet de savoir le numéro de catégorie
const quelleCategorieId = async (elementId) => {
    // Récupération de la liste grâce à l'API
    const reponse = await fetch ("http://localhost:5678/api/categories")
    let categorie = await reponse.json()

    let i = 0
    while (categoryNewWork.value !== categorie[i].name) {
        i++
        if ( categoryNewWork.value === categorie[i].name ) {
            return categorie[i].id
        }
        else if (i > categorie.length) {
            break
        }
    }
}

