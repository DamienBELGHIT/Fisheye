//get the json data of the photographers
async function getPhotographers() {
  const json = fetch("../../data/photographers.json")
  .then(res => res.json())
  .then((data)=> {return data;})
  return json;
}

//create div displaying the photographers data
async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
};

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
};

init();

