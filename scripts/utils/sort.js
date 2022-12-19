//Récupère les éléments du dom
const dropdown = document.querySelector(".dropdown-sort");
const medias = document.querySelector(".medias_section");

//Event de tri des Medias
dropdown.addEventListener('change', (event) => {displayMedias(sortMedias(mediaList,event.target.value))});

//Trie un tableau de medias selon un type de tri en paramètre
function sortMedias(mediasArray, sortMethod){
    let sortFunction;
    if(sortMethod === "popularity"){
        sortFunction = (a,b)=> {return b.likes-a.likes};
    }else if(sortMethod === "date"){
        sortFunction = (a,b)=> {return parseInt(b.date.replace(/-/g, ""))-parseInt(a.date.replace(/-/g, ""))};
    }else if(sortMethod === "title"){
        sortFunction = (a,b)=> {return a.title.localeCompare(b.title)};
    }
    mediasArray.sort(sortFunction);
    displayMedias(mediasArray);
    return mediasArray;
}