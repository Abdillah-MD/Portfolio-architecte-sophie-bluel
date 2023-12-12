import {isLogin} from "../index/admin.js"

const boutonModifier = document.querySelector(".modaleBtnModifier") 
const wrapper1 = document.querySelector(".modale__wrapper-1")
const wrapper2 = document.querySelector(".modale__wrapper-2")

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
    sessionConnected.style.fontSize = "1.2em"
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

// Fonction pour ouvrir la modale
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

  importNewPhoto()
  navigationModal()

}

// Fonction pour fermer la modale
const closeModal = (fenetre) => {
  const boutonCloseModale = document.querySelectorAll(".fa-xmark")
  // Ecouter le bouton X pour fermer modale 
  boutonCloseModale.forEach ( (xmark) => {
    xmark.addEventListener("click", () => {
      fenetre.style.display = "none"
      fenetre.setAttribute( "aria-hidden", "true" )
      fenetre.removeAttribute("aria-modal", "true")

      resetAnimation()
    })
  })

  // Ecouter le click sur fenêtre grise pour fermer modale
  fenetre.addEventListener("click", () => {
    fenetre.style.display = "none"
    fenetre.setAttribute( "aria-hidden", "true" )
    fenetre.removeAttribute("aria-modal", "true")

    resetAnimation()
  })

  // Ecouter le click sur le bouton Eschape du clavier 
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" || e.key === "Esc") {
      fenetre.style.display = "none"
      fenetre.setAttribute( "aria-hidden", "true" )
      fenetre.removeAttribute("aria-modal", "true")

      resetAnimation()
    }
  })

  fenetre.querySelector(".modale__wrapper-1").removeEventListener("click", (e) => {
    e.stopPropagation()
  })
}

// Fonction pour montrer l'apperçu photo importé 
const importNewPhoto = () => {
  const sectionFileImported = document.querySelector(".ajoutPhoto")
  const fileInput = document.querySelector("input[type=file]")
  const previewImage = document.querySelector(".ajoutPhoto img")

  fileInput.addEventListener("change", (e) => {
    const fileSelected = e.target.files[0]

    // Montres l'apperçu de la photo
    if (fileSelected) {
      sectionFileImported.innerHTML = ""

      let imageURL = URL.createObjectURL(fileSelected)
      previewImage.src = imageURL
      previewImage.style.display = "block"
      previewImage.style.height = "100%"
      previewImage.style.objectfit = "cover"
      sectionFileImported.appendChild(previewImage)

    }

  })

}

// Permet d'afficher la page de la modale en fonction actvité utilisateur
const navigationModal = () => {
  const modal = document.querySelector(".modale")
  const formulaireModale = document.querySelector(".ajoutWorks-form")
  const boutonAjoutPhoto = document.querySelector("#ajoutPhotoBtn")
  const previousBtn = document.querySelector(".fa-arrow-left")
  

  // Lecture de l'animation au clique du bouton ajout photo
  boutonAjoutPhoto.addEventListener("click", () => {

    wrapper1.classList.remove("animation__wrapper-1")
    wrapper2.classList.remove("animation__wrapper-2")

    replayAnimation()

    wrapper1.style.setProperty("animation", "nextModale 0.3s both")
    wrapper2.style.setProperty("animation", "scndModale 0.3s 200ms both")

  })

  // 
  previousBtn.addEventListener("click", () => {

    replayAnimation()

    // resetAnimation()
    wrapper1.classList.add("animation__wrapper-1")
    wrapper2.classList.add("animation__wrapper-2")
    formulaireModale.reset()
  })
  
}

// Supprimer la propriété css animation 
const resetAnimation = () => {
  wrapper1.style.removeProperty("animation")
  wrapper2.style.removeProperty("animation") 
}

// Permet relire l'animation si elle a déjà été joué par le navigateur
const replayAnimation = () => {
  // Réinitialiser la propriété d'animation pour permettre la répétition
  wrapper1.style.animation = "none"
  wrapper2.style.animation = "none"

  // Forcer le recalcul du style
  void wrapper1.offsetWidth
  void wrapper2.offsetWidth
}