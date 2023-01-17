import {closeModal, displayModal} from "./modal.js";

//Récupère les éléments du DOM
const lightBoxModal = document.getElementById("lightbox_modal");
const btn_closeLightBoxModal = lightBoxModal.querySelector(".modal header .modal-close-btn");
const lightboxContent = lightBoxModal.querySelector(".zoomed-content");
const btn_previous = document.getElementById("previousContent-btn");
const btn_next = document.getElementById("nextContent-btn");
let currentMedia;

//Events de fermeture de la modale
btn_closeLightBoxModal.addEventListener("click", ()=>closeModal(lightBoxModal));
btn_closeLightBoxModal.addEventListener("keydown",e => {if (e.key === "Enter"){closeModal(lightBoxModal)}});

//Ouverture de la modale
export function openLightbox(media){
    setLightboxContent(media);
    displayModal(lightBoxModal);
}

//Changement du contenu de la modale
function setLightboxContent(media){
    currentMedia = media;
    const content = media.querySelector(".content");
    lightboxContent.firstChild && lightboxContent.removeChild(lightboxContent.firstChild);
    lightboxContent.appendChild(content.cloneNode());

    //Active les contrôle si le média est de type vidéo
    lightboxContent.firstChild.nodeName === "VIDEO" && lightboxContent.firstChild.setAttribute("controls", true);

    //Affiche les flèches seulement si elles mènent vers un média
    btn_previous.style.display= media.previousSibling ? "block" : "none";
    btn_next.style.display= media.nextSibling ? "block" : "none";
}

//Events passant au media suivant
const nextMedia = (media)=>media.nextSibling && setLightboxContent(media.nextSibling);

btn_next.addEventListener("click", ()=>nextMedia(currentMedia));
btn_next.addEventListener("keydown",e => {if (e.key === "Enter") {nextMedia(currentMedia)}});
document.addEventListener("keydown",e => {
    if (lightBoxModal.getAttribute('aria-hidden') == 'false' && e.key === "ArrowRight") {
        nextMedia(currentMedia);
    }
 })

//Events passant au media précédent
const previousMedia = (media)=>media.previousSibling && setLightboxContent(media.previousSibling);

btn_previous.addEventListener("click", ()=>previousMedia(currentMedia));
btn_previous.addEventListener("keydown",e => {if (e.key === "Enter") {previousMedia(currentMedia)}});
document.addEventListener("keydown",e => {
    if (lightBoxModal.getAttribute('aria-hidden') == 'false' && e.key === "ArrowLeft") {
        previousMedia(currentMedia);
    }
 })