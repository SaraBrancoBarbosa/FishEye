import { getUserImage } from "../factories/media.js"
import { getUserVideo } from "../factories/media.js"

export function photographerTemplate(photographer) {
    const { name, portrait, city, country, tagline, price } = photographer;

    const profile = `assets/photographers/${portrait}`;

    // Header informations about the photographer
    function getUserCardProfile() {
        const photographerHeader = document.querySelector(".photographer_header");

        const photographerHeaderContent1 = document.createElement("div");
        photographerHeaderContent1.classList.add("photographer_header_content");
        const photographerProfile = document.createElement("div");
        photographerProfile.classList.add("profile");
        photographerProfile.tabIndex = "0";

        const h1 = document.createElement("h1");
        h1.textContent = name;

        const photographerProfileText = document.createElement("div");
        photographerProfileText.classList.add("text");

        const h2 = document.createElement("h2");
        h2.textContent = city + ', ' + country;

        const photographerTaglineElement = document.createElement("p");
        photographerTaglineElement.classList.add("tagline");
        photographerTaglineElement.textContent = tagline;

        const photographerHeaderContent2 = document.createElement("div");
        photographerHeaderContent2.classList.add("photographer_header_content");
        const btnContact = document.querySelector(".contact_button");

        const photographerHeaderContent3 = document.createElement("div");
        photographerHeaderContent3.classList.add("photographer_header_content");
        const photographerImg = document.createElement("img");
        photographerImg.setAttribute("src", profile);
        photographerImg.alt = `${name}`;
        photographerImg.tabIndex = "0";

        photographerHeader.appendChild(photographerHeaderContent1);
        photographerHeader.appendChild(photographerHeaderContent2);
        photographerHeader.appendChild(photographerHeaderContent3);
        photographerHeaderContent1.appendChild(photographerProfile);
        photographerProfile.appendChild(h1);
        photographerProfile.appendChild(photographerProfileText);
        photographerProfileText.appendChild(h2);
        photographerProfileText.appendChild(photographerTaglineElement);
        photographerHeaderContent2.appendChild(btnContact);
        photographerHeaderContent3.appendChild(photographerImg);

        return (photographerHeader);
    }

    // Maintenant il faut l'appeler dans le fichier /pages/photographer.js ... Mais où ?
    function getPriceTotalLikesBox() {
        const priceBox = document.querySelector(".price-box");
        const likeCounter = document.querySelector(".like-count");
        
        priceBox.innerHTML = `${price}` + "€/jour";

        return priceBox;
    }

    // To get the respective medium for each photographer. It contains the img and video functions.
    // These functions are imported from the "factories" folder.
    function getUserMedium(photographer, medium) {
        
        // Cut the names to go to the right folders
        const path = "/assets/photographers/"+(photographer.name.split(" ")[0].replaceAll("-", " ")+"/small");

        if (medium.video) {
            return getUserVideo(path,medium)
        } 

        return getUserImage(path, medium)
    }

    return { getUserCardProfile, getUserMedium, getPriceTotalLikesBox}
}