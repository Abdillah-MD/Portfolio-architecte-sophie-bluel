import { addNewWork } from "../modale/addWorks.js"
import { openModal, afficherElementAdmin } from "../modale/modale.js"

export let isLogin = sessionStorage.getItem("token") ? true : false

afficherElementAdmin()
openModal()
addNewWork()