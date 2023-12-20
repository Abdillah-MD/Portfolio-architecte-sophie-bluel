import { openModal, afficherElementAdmin } from "../modale/modale.js"
// import { valueFormModale } from "../modale/addWorks.js"

export let isLogin = sessionStorage.getItem("token") ? true : false

afficherElementAdmin()
openModal()