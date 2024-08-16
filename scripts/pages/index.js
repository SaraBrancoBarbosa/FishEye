import { indexTemplate } from "../templates/index.js";

async function getPhotographers() {
    
    const database = await fetch("data/database.json")
    .then(response => response.json());    
    
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

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

window.onload = () => {
    init()
}