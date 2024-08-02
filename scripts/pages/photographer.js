import { photographerTemplate } from "../templates/photographer.js"
import { launchLightboxModal } from "../utils/lightbox.js"
import { getFilterElements } from "../utils/filter.js"

async function getPhotographer() {
    
    // Cherche l'ID des photographes dans la barre URL
    const id = new URLSearchParams(window.location.search).get("id")
    // Récupération des données depuis le fichier JSON   
    const database = await fetch("data/database.json")
    .then(response => response.json());    
    
    // On retourne le tableau photographers une fois les données récupérées
    return (
        {
            //.find chercher de quoi matcher. ''+p -> on convertit en chaîne de caractères
            photographer: database.photographers.find(p => ""+p.id === ""+id),
            // .filter permet de retourner tous les éléments qui correspondent 
            media:database.media.filter(m => ""+m.photographerId === ""+id)
        }
    )
}

async function displayData(photographer, media) {
    const photographerMedias = document.querySelector(".photographer_medias");

    const photographerModel = photographerTemplate(photographer);
    
    photographerModel.getUserCardProfile();

    const path = "/assets/photographers/"+(photographer.name.split(" ")[0].replaceAll("-", " "));

    media.forEach((medium, i) => {
        const card = photographerModel.getUserMedium(photographer, medium)
        const figure = card.querySelector(".card")
        figure.id = medium.id
        console.log(card)
        
        let src = null; 
        if (medium.video) {
            src = card.querySelector(".medium-card_video")
            } else {
            src = card.querySelector(".medium-card_img")
            }

        // Opens Lightbox by clicking
        src.onclick = () => {
            launchLightboxModal(path, media, i)
        }
        // Opens Lightbox by pressing the enter and space keys
        src.onkeydown = function(e){
            if(e.key === "Enter" || e.key === "Space"){
                launchLightboxModal(path, media, i)
            }
         };

        photographerMedias.appendChild(figure)
    })

    getFilterElements(media);
    
}

export async function initPhotographer() {
    // Récupère les datas des photographes
    const { photographer, media } = await getPhotographer();
    displayData(photographer, media);
}

initPhotographer()