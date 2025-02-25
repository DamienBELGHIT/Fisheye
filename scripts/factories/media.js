import { addLikeTotal, photographName } from "../pages/photographer.js";
import { openLightbox } from "../utils/lightboxModal.js";

//Factory function qui génere les éléments du DOM pour un media sur la page de profil d'un photographe
export function mediaFactory(data) {
    const { title, image, video, likes} = data;
  
    const content =  `assets/photos/${photographName.split(' ').join('_')}/${image || video}`;
  
    function getMediaDOM() {
      const container = document.createElement('li');
      container.setAttribute("aria-label", title);
      container.classList.add("media");        
      
      //contenu
      let div_content;
        if(image){
            div_content = document.createElement('img');
            div_content.setAttribute("src", content);
        }
        else if(video){
            div_content = document.createElement('video');
            div_content.setAttribute("src", content+"#t=0.5"); 
            div_content.setAttribute("type", "video/"+content.split('.').pop());
            div_content.setAttribute("preload", "metadata");
        }
        div_content.setAttribute("alt", title);
        div_content.classList.add("content");
        div_content.setAttribute("tabindex",0);
        
        //Events d'ouverture de la lightbox
        div_content.addEventListener("click", ()=>openLightbox(container));
        div_content.addEventListener("keydown",e => {if (e.key === "Enter") {openLightbox(container)}});
  
      //titre
      const div_title = document.createElement('h2');
      div_title.textContent = title;
  
      //likes
      const div_like = document.createElement('span');
      const heart_icon = document.createElement('i');
      heart_icon.classList.add("fa-solid", "fa-heart");
      div_like.classList.add("btn-like");
      div_like.setAttribute("aria-label", "Add like to media");
      div_like.textContent = likes;
      div_like.setAttribute("tabindex",0);

      function togglelike(){
        const liked = div_like.toggleAttribute("liked");
        let likes = div_like.textContent;
        if(liked){
          likes++;
          div_like.setAttribute("aria-label", "Remove like from media");
          addLikeTotal(1);
        }else{
          likes--;
          div_like.setAttribute("aria-label", "Add like to media");
          addLikeTotal(-1);
        }
        div_like.childNodes[0].textContent = likes;
      }
      //Events de like du media
      div_like.addEventListener("click", ()=>togglelike());
      div_like.addEventListener("keydown",e => {if (e.key === "Enter") {togglelike()}});

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