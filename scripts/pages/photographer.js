//Mettre le code JavaScript lié à la page photographer.html

async function getPhotographers() {
    
    // Récupération des données depuis le fichier JSON   
    const database = await fetch('data/database.json')
    .then(response => response.json());    
    
    // On retourne le tableau photographers une fois les données récupérées
    return (
        {
        photographers: database.photographers
        }
    )
}

// Changer tout ça en bas
async function displayData(photographers) {
    const photographerHeader = document.querySelector(".photographer_header");
    const photographerMedias = document.querySelector('.photograph_medias');

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const UserCardProfile = photographerModel.getUserCardProfile();
        photographerHeader.appendChild(UserCardProfile);
        photographerMedias.appendChild(UserCardProfile);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
    
