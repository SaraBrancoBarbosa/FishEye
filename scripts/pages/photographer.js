import { photographerTemplate } from "../templates/photographer.js"

async function getPhotographer() {
    
    // Cherche dans la barre URL
    const id = new URLSearchParams(window.location.search).get('id')
    // Récupération des données depuis le fichier JSON   
    const database = await fetch('data/database.json')
    .then(response => response.json());    
    
    // On retourne le tableau photographers une fois les données récupérées
    return (
        {
            //.find chercher de quoi matcher. ''+p -> on convertit en chaîne de caractères
            photographer: database.photographers.find(p => ''+p.id === ''+id),
            // .filter permet de retourner tous les éléments qui correspondent 
            media:database.media.filter(m => ''+m.photographerId === ''+id)
        }
    )
}

// Changer tout ça en bas
async function displayData(photographer, media) {
    const photographerMedias = document.querySelector('.photographer_medias');

    
        console.log("photographerMedias", photographerMedias)
        const photographerModel = photographerTemplate(photographer);
        
        photographerModel.getUserCardProfile();
        media.forEach(medium => {
            const card = photographerModel.getUserMedium(photographer, medium)
            
            let src = null; 
            if (medium.video) {
                src = card.querySelector('.medium-card_video')
              } else {
               src = card.querySelector('.medium-card_img')
              }

            src.onclick = () => {
                launchLightboxModal()
            }
            photographerMedias.appendChild(card)
        })
    
}

export async function initPhotographer() {
    // Récupère les datas des photographes
    const { photographer, media } = await getPhotographer();
    displayData(photographer, media);
}