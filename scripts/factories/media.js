//Factory function qui génere les éléments du DOM pour un media sur la page de profil d'un photographe
function mediaFactory(data, photographe) {
    const { title, image, video, likes} = data;
  
    const content = image ? `assets/photos/${photographe.split(' ').join('_')}/${image}` : `assets/photos/${photographe.split(' ').join('_')}/${video}`;
  
    function getMediaDOM() {
      const article = document.createElement('article');
      article.setAttribute("aria-label", title);
      article.classList.add("media");        
      article.addEventListener("click", ()=>openLightbox(article));
      
      //contenu
      let div_content ="";
        if(image){
            div_content = document.createElement('img');
            div_content.setAttribute("src", content);
            div_content.setAttribute("alt", title);
        }
        else if(video){
            div_content = document.createElement('video');
            div_content.setAttribute("src", content); 
            div_content.setAttribute("type", "video/"+content.split('.').pop());
            div_content.setAttribute("alt", title);
        }
        div_content.classList.add("content");
  
      //titre
      const div_title = document.createElement('h2');
      div_title.textContent = title;
  
      //likes
      const div_like = document.createElement('span');
      const heart_icon = document.createElement('i');
      heart_icon.classList.add("fa-solid", "fa-heart");
      div_like.textContent = likes;
      div_like.appendChild(heart_icon);
  
      //assemblage
      const section = document.createElement('section');
      article.appendChild(div_content);
      section.appendChild(div_title);
      section.appendChild(div_like);
      article.appendChild(section);
      return (article);
    }
    return { title, content, getMediaDOM }
  }