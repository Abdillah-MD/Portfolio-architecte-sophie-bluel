export const cleToken = sessionStorage.getItem("token")

// Fonction qui permet la suppression des éléments
export const deleteWork = (target, worksDataFiltre) => {

    // console.log(worksDataFiltre)
    for (let i = 0; i < target.length; i++ ) {
        target[i].addEventListener("click", () => {
            console.log(i)
            console.log(worksDataFiltre[i].id)
            alert(`Êtes vous sûr de vouloir supprimer " ${worksDataFiltre[i].title} " ? `)

            deleteWorkRequest(worksDataFiltre[i].id)
        })
    }
}

// Permet d'envoyer la requête à l'API pour avoir l'autorisation de supprimer
const deleteWorkRequest = async (id) => {
    const request = await fetch (`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {"Authorization": `Bearer ${cleToken}`}
    })
}