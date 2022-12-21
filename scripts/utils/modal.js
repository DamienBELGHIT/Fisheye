//Récupère les éléments du DOM
const main = document.querySelector("main");

// Ouvre la modale
export function displayModal(modal) {
    main.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-hidden', 'false');
	modal.style.display = "block";
    document.querySelector('body').classList.add('no-scroll');

    //Change le focus sur la fermeture de la modale
    const btn_close = modal.querySelector(".modal-close-btn");
    window.setTimeout(()=> btn_close.focus(),0); 
    
    //Ferme la modale quand on presse "Echap"
    document.addEventListener("keydown",e => {
        if (modal.getAttribute('aria-hidden') == 'false' && e.key === "Escape") {
            closeModal(modal);
        }
     })
}

// Ferme la modale
export function closeModal(modal) {
    main.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-hidden', 'true');
    modal.style.display = "none";
    document.querySelector('body').classList.remove('no-scroll');
}
