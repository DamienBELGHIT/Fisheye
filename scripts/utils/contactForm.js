import {closeModal, displayModal} from "./modal.js";
//Récupère les éléments du DOM
const submitForm = document.querySelector(".modal .contact_button");
const contactModal = document.getElementById("contact_modal");
const formData = document.querySelectorAll(".formData");
const btn_openContactModal = document.querySelector(".contact_button");
const btn_closeContactModal = contactModal.querySelector(".modal header .modal-close-btn");

//Events d'ouverture de la modale
btn_openContactModal.addEventListener("click", ()=>displayModal(contactModal));

//Events de fermeture de la modale
btn_closeContactModal.addEventListener("click", ()=>closeModal(contactModal));

//Envoie les infos du formulaire si tous les champs sont valides
submitForm.addEventListener("click", (event)=>{
    event.preventDefault();
    let valid = true;
    let res = "";
    formData.forEach(function(div){ 
        let input = div.querySelector("input") ? div.querySelector("input") : div.querySelector("textarea");
        !checkInput(input) && (valid=false);
        res += "|" + input.value; 
    });
    if(valid){
        console.log("Envoi : "+res);
        closeModal();
    }
});

//Vérifie si un input est valide et l'affiche en erreur si ça n'est pas le cas
function checkInput(input){
    const div = input.parentElement;
    if(input.validity.valid){
      div.setAttribute("data-error-visible", false);
      return true;
    }else{
      div.setAttribute("data-error-visible", true);
      return false;
    }
  }