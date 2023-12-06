// import {connect} from "../modale/modale.js"

const form = document.getElementById("formLogin")
const mail = document.getElementById("email")
const mdp = document.getElementById("motdepasse")
let retourServeur

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    
    const data = {
        email: mail.value,
        password: mdp.value
    }
    const dataChargeUtile = JSON.stringify(data)
    console.log(data)

    // Posté les réponses de l'utilisateur et voir le retour de l'API
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST", 
        headers: {"Content-Type": "application/json" },
        body: dataChargeUtile
    })
    
    retourServeur = await reponse.json()
    console.log(reponse.status)
    console.log(retourServeur)

    // Traitement de l'erreur 401 - cas où pas autorisé (erreur mdp)
    if (reponse.status === 401) {
        const errorMessage = document.querySelector("#login h2")
        errorMessage.innerHTML = `<h2>Log in</h2>
                                    <p class="mdpIncorrect"> <i class="fa-solid fa-circle-xmark"></i> Mot de passe incorrect. Veuillez réessayer !</p>`
    }

    // Traitement de l'erreur 404 - cas où aucun compte n'est trouvé
    else if (reponse.status === 404) {
        const errorMessage = document.querySelector("#login h2")
        errorMessage.innerHTML = `<h2>Log in</h2>
                                    <p class="mdpIncorrect"> <i class="fa-solid fa-circle-xmark"></i> Email incorrect. Veuillez réessayer !</p>`
    }

    // Traitement du retour 200 - cas où mot de passe est correct 
        if (reponse.status === 200) {
            console.log("Vous êtes connecté")
            sessionStorage.setItem('token', `${retourServeur.token}`)
            sessionStorage.setItem('mailUtilisateur', `${data.email}`)
            sessionStorage.setItem('mdpUtilisateur', `${data.password}`)
            console.log(retourServeur.token)
            // Redirectiion vers page d'accueil
            window.location.replace("/FrontEnd/index.html")
        
            const logout = document.querySelector(".logIn")
            logout.innerText = "logout"
        }
})
