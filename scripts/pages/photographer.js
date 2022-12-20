import { getPhotographers } from "../utils/retrieveData.js";
import {photographerFactory} from "../factories/photographer.js";
import {mediaFactory} from "../factories/media.js";
import {sortMedias} from "../utils/sort.js";

export let mediaList; 
export let photographName;

//Retourne les données d'un photographe et son nombre total de likes depuis son id, retourne null si non existant
async function getPhotographerById(id){
  const data = await getPhotographers();
  let likesTot = 0;
  data.media.filter(e=>e.photographerId == id).forEach((media)=>likesTot += media.likes);
  let photograph = data.photographers.find(e => e.id == id);
  photograph.likesTotal = likesTot;
  return photograph;
}

//Retourne un tableau comportant les oeuvres d'un photographe depuis son id
async function getGalleryById(id){
  const data = await getPhotographers();
  const gallery = data.media.filter(e=>e.photographerId == id);
  return gallery;
}

//Ajoute des likes au total de likes du photographe
export function addLikeTotal(val){
  const div_likes_tot = document.querySelector(".likes-tot");
  div_likes_tot.childNodes[0].textContent = parseInt(div_likes_tot.textContent)  + val;
}

//Affiche les données du photographe
function displayPhotographer(photograph){
  //crée les éléments du DOM affichant les données du photographe dans le header
  const photographSection = document.querySelector('.photograph-header');
  const photographModel = photographerFactory(photograph);
  const photographDOM = photographModel.getUserHeaderDOM();
  photographSection.appendChild(photographDOM);

  //déplace le bouton contact dans l'élément créé
  const btn_contact = photographSection.querySelector('.contact_button');
  const div_picture = document.querySelector('.profile-picture');
  div_picture.parentNode.insertBefore(btn_contact, div_picture);

  //crée l'encart du tarif et du total de likes du photographe
  const main = document.querySelector('main');
  const encartDOM = photographModel.getUserEncartDOM();
  main.appendChild(encartDOM);  
}

//Affiche la liste de medias du photographe
export function displayMedias(medias){
  const mediasSection = document.querySelector('.medias_section');
  mediasSection.textContent = "";

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media, photographName);
    const mediaDOM = mediaModel.getMediaDOM();
    mediasSection.appendChild(mediaDOM);
  });
}

//Event de tri des Medias
const dropdown = document.querySelector(".dropdown-sort");
dropdown.addEventListener('change', (event) => {displayMedias(sortMedias(mediaList,event.target.value))});

async function init() {
    // Récupère les datas du photographe
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    const photograph = await getPhotographerById(id);
    displayPhotographer(photograph);

    mediaList = await getGalleryById(id);
    photographName = photograph.name;

    //crée les éléments du DOM affichant les données des medias du photographe
    displayMedias(sortMedias(mediaList, "popularity"));
  }

init();