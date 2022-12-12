function photographerFactory(data) {
  const { name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  function getUserCardDOM() {
    const article = document.createElement('article');

    const img = document.createElement('img');
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

    const div_name = document.createElement('h2');
    div_name.textContent = name;

    const div_location = document.createElement('h3');
    div_location.textContent = city+", "+country;

    const div_tagline = document.createElement('p');
    div_tagline.textContent = tagline;

    const div_price = document.createElement('p');
    div_price.textContent = price+"€/jour";

    article.appendChild(img);
    article.appendChild(div_name);
    article.appendChild(div_location);
    article.appendChild(div_tagline);
    article.appendChild(div_price);
    return (article);
  }
  return { name, picture, getUserCardDOM }
}