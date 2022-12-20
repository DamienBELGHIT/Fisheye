import { addLikeTotal, photographName } from "../pages/photographer.js";
import { openLightbox } from "../utils/lightboxModal.js";

//Factory function qui génere les éléments du DOM pour un media sur la page de profil d'un photographe
export function mediaFactory(data) {
    const { title, image, video, likes} = data;
  
    const content = image ? `assets/photos/${photographName.split(' ').join('_')}/${image}` : `assets/photos/${photographName.split(' ').join('_')}/${video}`;
  
    function getMediaDOM() {
      const container = document.createElement('li');
      container.setAttribute("aria-label", title);
      container.classList.add("media");        
      
      //contenu
      let div_content ="";
        if(image){
            div_content = document.createElement('img');
            div_content.setAttribute("src", content);
            div_content.setAttribute("alt", title);
        }
        else if(video){
            div_content = document.createElement('video');
            div_content.setAttribute("src", content+"#t=0.5"); 
            div_content.setAttribute("type", "video/"+content.split('.').pop());
            div_content.setAttribute("alt", title);
            div_content.setAttribute("preload", "metadata");
        }
        div_content.classList.add("content");
        div_content.addEventListener("click", ()=>openLightbox(container));
  
      //titre
      const div_title = document.createElement('h2');
      div_title.textContent = title;
  
      //likes
      const div_like = document.createElement('span');
      const heart_icon = document.createElement('i');
      heart_icon.classList.add("fa-solid", "fa-heart");
      div_like.classList.add("btn-like");
      div_like.setAttribute("aria-label", "Ajouter un like au media");
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
          div_like.setAttribute("aria-label", "Ajouter un like au media");
          addLikeTotal(-1);
        }
        div_like.childNodes[0].textContent = likes;
      });
      div_like.appendChild(heart_icon);
  
      //assemblage
      const section = document.createElement('section');
      container.appendChild(div_content);
      section.appendChild(div_title);
      section.appendChild(div_like);
      container.appendChild(section);
      return (container);
    }
    return { title, content, getMediaDOM }
  }