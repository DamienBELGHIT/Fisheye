//Factory function qui génere les éléments du DOM pour un profil de photographe
export function photographerFactory(data) {
  const { id, likesTotal, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  const article = document.createElement('article');
  article.setAttribute("aria-label", name);
  article.classList.add("photographer");

  //image de profil
  const img = document.createElement('img');
  img.classList.add("profile-picture");
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

  //Assemble les éléments d'un profil de photographe sur la page d'accueil
  function getUserCardDOM() {
    //lien vers la page de profil
    const link= document.createElement('a');
    link.setAttribute("href", "./photographer.html?id="+id);
    link.setAttribute("alt", name);

    //assemblage
    article.appendChild(link);
    link.appendChild(img);
    article.appendChild(div_name);
    article.appendChild(div_location);
    article.appendChild(div_tagline);
    article.appendChild(div_price);
    return (article);
  }

  //Crée les éléments d'un profil de photographe sur la page de profil
  function getUserHeaderDOM() { 
    //assemblage
    const section = document.createElement('section');
    section.appendChild(div_name);
    section.appendChild(div_location);
    section.appendChild(div_tagline);

    article.appendChild(section);
    article.appendChild(img);
    return (article);
  }

  function getUserEncartDOM() { 
    //total likes
    const div_likes = document.createElement('span');
    div_likes.classList.add("likes-tot");
    div_likes.textContent = likesTotal;
    const heart_icon = document.createElement('i');
    heart_icon.classList.add("fa-solid", "fa-heart");
    div_likes.appendChild(heart_icon);

    //assemblage
    const encart = document.createElement('div');
    encart.classList.add("encart_section");

    encart.appendChild(div_likes);
    encart.appendChild(div_price);
    return (encart);
  }

  return { name, picture, getUserCardDOM, getUserHeaderDOM, getUserEncartDOM}
}