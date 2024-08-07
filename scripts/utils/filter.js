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
window.addEventListener("keydown",(e) => {
    if (e.key === "Escape") {
        closeBoxFilter()
    }
});

/*********** Sort and filter the datas ***********/

export function getFilterElements(pMedia) {

    // When isAscending returns true, the first click/key is in ascending order
    let isAscending = true;
    const idActif = document.getElementById("actif");
    const items = [...document.querySelectorAll(".filter_item")];

    function sortByTitle() {
        pMedia.sort((a, b) => {
            if (isAscending) {
                idActif.setAttribute("aria-label", "Trié par ordre croissant");
                return a.title.localeCompare(b.title);
            } else {
                idActif.setAttribute("aria-label", "Trié par ordre décroissant");
                return b.title.localeCompare(a.title);
            }
        })
    }

    function sortByPopularity() {
        pMedia.sort((a, b) => {
            if (isAscending) {
                idActif.setAttribute("aria-label", "Trié par le plus populaire");
                return b.likes - a.likes;
            } else {
                idActif.setAttribute("aria-label", "Trié par le moins populaire");
                return a.likes - b.likes;
            }
        })
    }

    function sortByDate() {
        pMedia.sort((a, b) => {
            if (isAscending) {
                idActif.setAttribute("aria-label", "Trié par dates les plus récentes");
                return new Date(b.date) - new Date(a.date);
            } else {
                idActif.setAttribute("aria-label", "Trié par dates les moins récentes");
                return new Date(a.date) - new Date(b.date);
            }
        })
    }

    items.forEach(item => {
        const sortItem = () => {
            
            // Swaps the names
            const actifText = idActif.textContent.trim()
            const itemText = item.textContent.trim()
            idActif.textContent = itemText
            item.textContent = actifText

            // Sorts the media
            if (itemText === "Popularité") {
                sortByPopularity()
            } else if (itemText === "Titre") {
                sortByTitle()
            } else if (itemText === "Date") {
                sortByDate()
            }

            // Rebuilds the cards
            const photographerMedias = document.querySelector(".photographer_medias");
            const cards = [...photographerMedias.querySelectorAll(".card")];
            cards.forEach(card => card.remove());
            
            pMedia.forEach(media => {
                const card = cards.find(card => ""+card.id === ""+media.id)
                photographerMedias.appendChild(card)
            })
        }

        // Sorts by clicking
        item.onclick = ()=> {
            sortItem();
            isAscending = !isAscending;
        }
        
        // Sorts by using the keyboard
        item.onkeydown = (e) => {
            if(e.key === "Enter" || e.key === "Space"){
                sortItem();
                isAscending = !isAscending;
            }
        }
    })  
}