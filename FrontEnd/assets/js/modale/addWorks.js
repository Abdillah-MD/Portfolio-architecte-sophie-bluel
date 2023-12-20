// Permet de récupérer les éléments du form renseigné par l'utilisateur
const form = document.querySelector(".ajoutWorks-form")
const tilteWork = document.querySelector("input[name=title]")
const categoryNewWork = document.getElementById("worksCategory")
const btnSubmit = document.querySelector(".modalSubmitBtn")
const inputFile = document.querySelector("input[type=file]")

// Appelle API pour pouvoir envoyer les élements 
const addWork = async (formData) => {
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

        if (!Response.ok) {
            console.log("Erreur lors de l'envoie du fichier " + reponse.status + " " + reponse.statusText)
            console.log(request)
        }

    } catch (error) {
        console.log("Une erreur s'est produite" + error)
    }
    
}


// function handleFileSelect() {
//     const file = inputFile.files[0]

//     if (file) {
//         transformeFichierEnBase64(file)
//     }
// }

// function transformeFichierEnBase64(file) {
//     const reader = new FileReader()

//     reader.onload = function (event) {
//         const base64Data = event.target.result
//         // console.log(base64Data) // La représentation base64 de l'image

//         sessionStorage.setItem("imageBase64", `${base64Data}`)
//     }

//     reader.readAsDataURL(file)
// }

// Permet de desactiver le bouton si champ vide 

const btnDisable = () => {
    if (
        inputFile.files.length !== 1 ||
        tilteWork.value === "" ||
        parseInt(categoryNewWork.value) === 0
    ) {
        btnSubmit.style.background = "#A7A7A7"
        btnSubmit.style.cursor = "not-allowed"
        btnSubmit.disabled = true
    } else {
        btnSubmit.disabled = false
        btnSubmit.style.background = "#1D6154"
        btnSubmit.style.cursor = "pointer"
    }
}

// Ecouter tous les champs pour voir si il sont remplis ou pas
const majBtnDisable = () => {
    inputFile.addEventListener("change", () => {
        btnDisable()
        // handleFileSelect()
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

// Ecouter le submit du formulaire  |||| sessionStorage.getItem("imageBase64")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const formData = new FormData(form)

    formData.append("image", inputFile.files[0])
    formData.append("title", tilteWork.value)
    formData.append("category", parseInt(categoryNewWork.value))

    console.log(formData.get("image"))
    console.log(typeof parseInt(categoryNewWork.value))

    console.log(formData.length)

    // Convertir les données FormData en un objet JavaScript
    const formDataObject = {}
    for (const [key, value] of formData.entries()) {
    formDataObject[key] = value
    }

    // Afficher l'objet dans la console
    console.log(formDataObject)

    await addWork(formData)

})

btnDisable()
majBtnDisable()
