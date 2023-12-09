import {isLogin} from "../index/admin.js"

const boutonModifier = document.querySelector(".modaleBtnModifier") 

// Condition qui permet d'ouvrir le modale - admin 
export const afficherElementAdmin = () => {
  if ( isLogin === true ) {
    console.log(isLogin)
    boutonModifier.style.display = "block"
    const adminBanniere = document.querySelector(".admin")
    adminBanniere.style.display = "block"

    // Changer le texte login en logout
    const sessionConnected = document.querySelector(".connexion")
    sessionConnected.innerHTML = `<a href="#" class="connexion">logout</a>`
    sessionConnected.addEventListener("click", (e) => {
      e.preventDefault()
      sessionStorage.removeItem("token")
      location.reload()

    })

    // Supprimer les boutons boutons filters
    const supprimerBtnFilter = document.querySelector(".filtreBtn")
    supprimerBtnFilter.innerHTML = ""
  }
  else {
    console.log(isLogin)
  }
}

export const openModal = () => {
  const fenetreModale = document.getElementById("modale")
  boutonModifier.addEventListener("click", () => {
    fenetreModale.style.display = "flex"
    fenetreModale.removeAttribute("aria-hidden")
    fenetreModale.setAttribute("aria-modal", "true")
  })

  fenetreModale.addEventListener("click", closeModal(fenetreModale))
  // Evite que le click sur les éléments enfant ferme aussi la modale avec stopPropagation()
  fenetreModale.querySelectorAll("div").forEach((div) => {
    div.addEventListener("click", (e) => {
      e.stopPropagation()
    })
  })

}

const closeModal = (fenetre) => {
  const boutonCloseModale = document.querySelectorAll(".fa-xmark")
  // Ecouter le bouton X pour fermer modale 
  boutonCloseModale.forEach ( (xmark) => {
    xmark.addEventListener("click", () => {
      fenetre.style.display = "none"
      fenetre.setAttribute( "aria-hidden", "true" )
      fenetre.removeAttribute("aria-modal", "true")
    })
  })

  // Ecouter le click sur fenêtre grise pour fermer modale
  fenetre.addEventListener("click", () => {
    fenetre.style.display = "none"
    fenetre.setAttribute( "aria-hidden", "true" )
    fenetre.removeAttribute("aria-modal", "true")
  })

  // Ecouter le click sur le bouton Eschape du clavier 
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      fenetre.style.display = "none"
      fenetre.setAttribute( "aria-hidden", "true" )
      fenetre.removeAttribute("aria-modal", "true")
    }
  })

  fenetre.querySelector(".modale__wrapper-1").removeEventListener("click", (e) => {
    e.stopPropagation()
  })
}

