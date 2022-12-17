//Factory function qui génere les éléments du DOM pour un media sur la page de profil d'un photographe
function mediaFactory(data, photographe) {
    const { title, image, video, likes} = data;
  
    const content = image ? `assets/photos/${photographe.split(' ').join('_')}/${image}` : `assets/photos/${photographe.split(' ').join('_')}/${video}`;
  
    function getMediaDOM() {
      const article = document.createElement('article');
      article.setAttribute("aria-label", title);
      article.classList.add("media");        
      
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
        div_content.addEventListener("click", ()=>openLightbox(article));
  
      //titre
      const div_title = document.createElement('h2');
      div_title.textContent = title;
  
      //likes
      const div_like = document.createElement('span');
      const heart_icon = document.createElement('i');
      heart_icon.classList.add("fa-solid", "fa-heart");
      div_like.classList.add("btn-like");
      div_like.setAttribute("aria-label", "Mettre un like au media");
      div_like.textContent = likes;
      //Event de like du media
      div_like.addEventListener("click", ()=>{
        const liked = div_like.toggleAttribute("liked");
        let likes = div_like.textContent;
        if(liked){
          likes++;
          div_like.setAttribute("aria-label", "Retirer le like du media");
          addLikeTotal(1);
        }else{
          likes--;
          div_like.setAttribute("aria-label", "Mettre un like au media");
          addLikeTotal(-1);
        }
        div_like.childNodes[0].textContent = likes;
      });
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