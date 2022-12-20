//Trie un tableau de medias selon un type de tri en paramètre
export function sortMedias(mediasArray, sortMethod){
    let sortFunction;
    if(sortMethod === "popularity"){
        sortFunction = (a,b)=> {return b.likes-a.likes};
    }else if(sortMethod === "date"){
        sortFunction = (a,b)=> {return parseInt(b.date.replace(/-/g, ""))-parseInt(a.date.replace(/-/g, ""))};
    }else if(sortMethod === "title"){
        sortFunction = (a,b)=> {return a.title.localeCompare(b.title)};
    }
    mediasArray.sort(sortFunction);
    return mediasArray;
}