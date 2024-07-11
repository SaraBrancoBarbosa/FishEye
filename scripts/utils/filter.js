/*********** Elements ***********/

// DOM elements
const btnFilter = document.querySelector(".filter_button");
const dropdownFilter = document.querySelector(".filter_dropdown");
const btnCloseFilter = document.querySelector(".filter-icon");

/*********** Launching and closing lightbox ***********/

// Function to prevent further propagation of the current event
const stopFilterPropagation = (event) => { 
    event.stopPropagation();
}

function launchBoxFilter() {
	dropdownFilter.style.display = "flex";
    dropdownFilter.addEventListener("click", closeBoxFilter); 
    dropdownFilter.querySelector(".filter_box").addEventListener("click", stopFilterPropagation);
    
    btnCloseFilter.addEventListener("click", closeBoxFilter);
}

function closeBoxFilter() {
    dropdownFilter.style.display = "none";
    dropdownFilter.removeEventListener("click", closeBoxFilter);
    dropdownFilter.querySelector(".filter_box").removeEventListener("click", stopFilterPropagation);
}

// Launches modal event by clicking on the button
btnFilter.addEventListener("click", launchBoxFilter);

// Pour l'instant la fermeture ne se fait qu'en cliquant sur le dropdown è_é 
//C'est l'inverse qu'on veut