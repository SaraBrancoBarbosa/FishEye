import { indexTemplate } from "../templates/index.js";

async function getPhotographers() {
    
    // Collects the JSON file's datas
    const database = await fetch("data/database.json")
    .then(response => response.json());    
    
    // Returns the photographers' table when the datas are collected
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
    // Collects the photographers' datas
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

// window.onload prepares the script and when the page is loaded, the script is ready
window.onload = () => {
    init()
}