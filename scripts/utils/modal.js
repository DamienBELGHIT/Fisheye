//Récupère les éléments du DOM
const main = document.querySelector("main");
const focusoutDiv = document.querySelector("header a");

//Events qui empêchent le focus en dehors des modales
document.querySelectorAll(".modal").forEach((modal)=>{
    modal.addEventListener("focusout", (ev)=>{
        if (ev.relatedTarget && !modal.contains(ev.relatedTarget)) {
            modal.querySelector(".modal-close-btn").focus();
        }
    })
})

//Event qui ferme les modales quand on appuie sur Echap
document.addEventListener("keydown", (ev)=>{
    const modal = document.querySelector(".opened-modal");
    if(modal){
    if (modal.getAttribute('aria-hidden') == 'false' && ev.key === "Escape") {
        closeModal(modal);
    }}
})
    

// Ouvre la modale
export function displayModal(modal) {
    main.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add("opened-modal");
	modal.style.display = "block";
    document.querySelector('body').classList.add('no-scroll');

    //Change le focus sur la fermeture de la modale
    const btn_close = modal.querySelector(".modal-close-btn");
    window.setTimeout(()=> btn_close.focus(),0); 
}

// Ferme la modale
export function closeModal(modal) {
    modal.classList.remove("opened-modal");
    main.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = "none";
    document.querySelector('body').classList.remove('no-scroll');
    focusoutDiv.focus()
}
