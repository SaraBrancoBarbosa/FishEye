import { indexTemplate } from "../templates/index.js";

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

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = indexTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

export async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}