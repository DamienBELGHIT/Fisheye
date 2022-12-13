//Factory function qui génere les éléments du DOM pour un profil de photographe sur la page d'accueil
function photographerFactory(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');
    article.setAttribute("aria-label", name);

    //lien vers la page de profil
    const link= document.createElement('a');
    link.setAttribute("href", "./photographer.html?id="+id);
    link.setAttribute("alt", name);

    //image de profil
    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    //nom
    const div_name = document.createElement('h2');
    div_name.textContent = name;

    //localisation
    const div_location = document.createElement('h3');
    div_location.textContent = city+", "+country;

    //description
    const div_tagline = document.createElement('p');
    div_tagline.classList.add("tagline");
    div_tagline.textContent = tagline;

    //tarif
    const div_price = document.createElement('p');
    div_price.textContent = price+"€/jour";

    article.appendChild(link);
    link.appendChild(img);
    article.appendChild(div_name);
    article.appendChild(div_location);
    article.appendChild(div_tagline);
    article.appendChild(div_price);
    return (article);
  }
  return { name, picture, getUserCardDOM }
}