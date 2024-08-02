/*********** Elements ***********/

// DOM elements
const btnFilter = document.querySelector(".filter_button");
const dropdownFilter = document.querySelector(".filter_dropdown");
const iconFilter = document.querySelector(".filter_icon");

/*********** Launching and closing lightbox ***********/

function launchBoxFilter() {
	dropdownFilter.style.display = "flex";
    iconFilter.style.transform = "scaleY(1)";
    
    iconFilter.addEventListener("click", closeBoxFilter); 
    
    btnFilter.setAttribute("aria-expanded", true);
}

function closeBoxFilter() {
    dropdownFilter.style.display = "none";
    iconFilter.style.transform = "scaleY(-1)";

    iconFilter.removeEventListener("click", closeBoxFilter);

    iconFilter.focus();
}

// Open dropdown by clicking on the button
iconFilter.onclick = () => {
    launchBoxFilter()
}

// Open dropdown event by pressing the enter and space keys
iconFilter.onkeydown = function(e){
    if(e.key === "Enter" || e.key === "Space"){
        launchBoxFilter()
    }
 };

// Close dropdown event by pressing the escape key
window.onkeydown = function(e){
    if(e.key === "Escape") {
        closeBoxFilter()
        iconFilter.focus();
    }
};

/*********** Sort and filter the datas ***********/

export function getFilterElements(pMedia) {

    const idActif = document.getElementById("actif");
    const items = [...document.querySelectorAll(".filter_item")];

    function sortByTitle() {
        pMedia.sort((a, b) => a.title.localeCompare(b.title));
    }

    function sortByPopularity() {
        pMedia.sort((a, b) => b.likes - a.likes);
    }

    function sortByDate() {
        pMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    items.forEach(item => {
        const sortItem = () => {
            // On swap les noms
            const actifText = idActif.textContent.trim()
            const itemText = item.textContent.trim()
            idActif.textContent = itemText
            item.textContent = actifText

            // Tri des medias
            if (itemText === "Popularité") {
                sortByPopularity()
            } else if (itemText === "Titre") {
                sortByTitle()
            } else if (itemText === "Date") {
                sortByDate()
            }
            // Reconstruction des vignettes
            const photographerMedias = document.querySelector(".photographer_medias");
            const cards = [...photographerMedias.querySelectorAll(".card")];
            cards.forEach(card => card.remove());
            
            pMedia.forEach(media => {
                const card = cards.find(card => ""+card.id === ""+media.id)
                console.log(card, media.id)
                photographerMedias.appendChild(card)
            })
        }

        item.onclick = sortItem
        item.onkeydown = (e) => {
            if(e.key === "Enter" || e.key === "Space"){
                sortItem()
            }
        }
    })  
}