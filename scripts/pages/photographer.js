import { photographerTemplate } from "../templates/photographer.js"
import { launchLightboxModal } from "../utils/lightbox.js"
import { getFilterElements } from "../utils/filter.js"
import {totalLikesMedia } from "../utils/totalLikes.js"

async function getPhotographer() {
    
    // Searches the photographers' ID in the URL bar
    const id = new URLSearchParams(window.location.search).get("id")

    const database = await fetch("data/database.json")
    .then(response => response.json());    
    
    return (
        {
            //.find to find anything to match. ''+p -> converting to string
            photographer: database.photographers.find(p => ""+p.id === ""+id),
            // .filter allows to return all the matching elements
            media:database.media.filter(m => ""+m.photographerId === ""+id)
        }
    )
}

async function displayData(photographer, pMedia) {
    const photographerMedias = document.querySelector(".photographer_medias");

    const photographerModel = photographerTemplate(photographer);
    
    photographerModel.getUserCardProfile();

    const path = "/assets/photographers/"+(photographer.name.split(" ")[0].replaceAll("-", " "));

    pMedia.forEach((pMedium, i) => {
        const card = photographerModel.getUserMedium(photographer, pMedium)
        const figure = card.querySelector(".card")
        figure.id = pMedium.id
        
        let src = null; 
        if (pMedium.video) {
            src = card.querySelector(".medium-card_video")
            } else {
            src = card.querySelector(".medium-card_img")
            }

        // Opens Lightbox by clicking
        src.onclick = () => {
            launchLightboxModal(path, pMedia, i)
            console.log(path,pMedia, i)
        }
        // Opens Lightbox by pressing the enter and space keys
        src.onkeydown = function(e){
            if(e.key === "Enter" || e.key === "Space"){
                launchLightboxModal(path, pMedia, i)
            }
         };

        photographerMedias.appendChild(figure)
    })

    // Calls the filter function
    getFilterElements(pMedia);

    // Calls the likes function
    totalLikesMedia()
}

export async function initPhotographer() {
    const { photographer, media } = await getPhotographer();
    displayData(photographer, media);
}

window.onload = () => {
    initPhotographer()
}