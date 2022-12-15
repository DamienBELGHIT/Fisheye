//Récupère les éléments du DOM
const submitForm = document.querySelector(".modal .contact_button")
const modal = document.getElementById("contact_modal");
const main = document.querySelector("main");
const formData = document.querySelectorAll(".formData");

// Ouvre la modale
function displayModal() {
    main.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'false');
    const btn_close = modal.querySelector(".modal-close-btn");
    btn_close.focus();
	modal.style.display = "block";
    document.querySelector('body').classList.add('no-scroll');
}

// Ferme la modale
function closeModal() {
    main.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = "none";
    document.querySelector('body').classList.remove('no-scroll');
}

// Ferme la modale quand la touche "Echap" est pressée
document.addEventListener("keydown",e => {
    if (modal.getAttribute('aria-hidden') == 'false' && e.key === "Escape") {
        closeModal();
    }
 })

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
    div = input.parentElement;
    if(input.validity.valid){
      div.setAttribute("data-error-visible", false);
      return true;
    }else{
      div.setAttribute("data-error-visible", true);
      return false;
    }
  }