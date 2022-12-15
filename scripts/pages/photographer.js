//Retourne les données d'un photographe depuis son id, retourne null si non existant
async function getPhotographerById(id){
  data = await getPhotographers();
  return data.photographers.find(e => e.id == id);
}

//Retourne un tableau comportant les oeuvres d'un photographe depuis son id
async function getGalleryById(id){
  data = await getPhotographers();
  const gallery = data.media.filter(e=>e.photographerId == id);
  return gallery;
}

//Affiche les éléments de la page liés au photographe
function displayData(medias, photograph){
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

  //crée les éléments du DOM affichant les données des medias du photographe
  const mediasSection = document.querySelector('.medias_section');

  medias.forEach((media) => {
    const mediaModel = mediaFactory(media, photograph.name);
    const mediaDOM = mediaModel.getMediaDOM();
    mediasSection.appendChild(mediaDOM);
  });
}

async function init() {
    // Récupère les datas du photographe
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    photograph = await getPhotographerById(id);
    displayData(await getGalleryById(id), photograph);
  };

init();