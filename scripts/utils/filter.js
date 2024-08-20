/*********** Elements ***********/

// DOM elements
const dropdownFilter = document.querySelector(".filter_dropdown");
const iconFilter = document.querySelector(".filter_icon");

/*********** Launching and closing filter ***********/

function openBoxFilter() {
	dropdownFilter.style.display = "flex";
    iconFilter.style.transform = "scaleY(1)";
    iconFilter.setAttribute("aria-expanded", true);
    dropdownFilter.setAttribute("opened", true);
}

function closeBoxFilter() {
    dropdownFilter.style.display = "none";
    iconFilter.style.transform = "scaleY(-1)";
    iconFilter.setAttribute("aria-expanded", false);
    dropdownFilter.setAttribute("opened", false);
    iconFilter.focus();
}

function swapBoxFilter() {
    if (dropdownFilter.getAttribute("opened")==="true") {
        closeBoxFilter()
    } else {
        openBoxFilter()
    } 
}

// Open dropdown by clicking on the button
iconFilter.onclick = swapBoxFilter

// Or by pressing the enter and space keys
iconFilter.onkeydown = function(e){
    if (e.key === "Enter"){ swapBoxFilter() }
 };

 // Close dropdown event by pressing the escape key
 window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeBoxFilter()
 })

/*********** Sort and filter the datas ***********/

export function getFilterElements(pMedia) {

    let isAscending = true;
    const idActif = document.getElementById("actif");
    const items = [...document.querySelectorAll(".filter_item")];

    const updateSortAttribute = (isAscending, nameUp, nameDown) => idActif.setAttribute("aria-label", "Trié par "+(isAscending ? nameUp : nameDown))
    
    function sortByTitle() {
        updateSortAttribute(isAscending, "ordre croissant", "ordre décroissant")
        pMedia.sort((a, b) => isAscending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))
    }

    function sortByPopularity() {
        updateSortAttribute(isAscending, "le plus populaire", "le moins populaire")
        pMedia.sort((a, b) => isAscending ? b.likes - a.likes : a.likes - b.likes)
    }

    function sortByDate() {
        updateSortAttribute(isAscending, "dates les plus récentes", "dates les moins récentes")
        pMedia.sort((a, b) => isAscending ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date))
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
            if(e.key === "Enter"){
                sortItem();
                isAscending = !isAscending;
            }
        }
    })  
}