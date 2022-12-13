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

function displayData(photographer){
    console.log(photographer);
}

async function init() {
    // Récupère les datas du photographe
    const params = (new URL(document.location)).searchParams;
    const id = params.get('id'); 
    console.log("Photographe : "+await getPhotographerById(id));
    console.log(await getGalleryById(id));
    displayData(id);
  };

init();