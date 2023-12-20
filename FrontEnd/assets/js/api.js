// Permet d'envoyer la requête à l'API pour avoir l'autorisation de supprimer
export const deleteWork = async (id) => {
    const request = await fetch (`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {"Authorization": `Bearer ${sessionStorage.getItem("token")}`}
    })
}

// Appelle API pour avoir l'autorisation de poster un nouveau work
export const addWork = async (formData) => {
    const request = await fetch ("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {"Authorization": `Bearer ${sessionStorage.getItem("token")}`},
        body: formData
    })
}