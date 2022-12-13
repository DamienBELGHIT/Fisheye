//récupère les données json des photographes
async function getPhotographers() {
    const json = fetch("../../data/photographers.json")
    .then(res => res.json())
    .then((data)=> {return data;})
    return json;
  }