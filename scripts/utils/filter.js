/*********** Elements ***********/

// DOM elements
const btnFilter = document.querySelector(".filter_button");
const dropdownFilter = document.querySelector(".filter_dropdown");
const iconFilter = document.querySelector(".filter_icon");
const boxFilter = document.querySelector(".filter_box");

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

// Open dropdown event by pressing the enter key
iconFilter.onkeydown = function(e){
    if(e.keyCode == 13){
        launchBoxFilter()
    }
 };

 // Close dropdown event by pressing the escape key
window.addEventListener("keydown",(event) => {
    if (event.key === 'Escape') {
        closeBoxFilter()
    }
  });

/*********** Sort and filter the datas ***********/

// Lightbox elements
let media = [];
let filterPath = ''

filterMedia = media;
filterPath = path;

const medium = filterMedia[index];
const video = figure.querySelector('.medium-card_video')
const img = figure.querySelector('.medium-card_img')

const idPopularite = document.getElementById("popularite");
const idDate = document.getElementById("date");
const idTitre = document.getElementById("titre");

function sortByTitle() {
    medium.sort((a, b) => a.title.localeCompare(b.title));
}

function sortByPopularity() {
    medium.sort((a, b) => b.likes - a.likes);
}

function sortByDate() {
    medium.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Ensuite pour "choisir" le filtre et l'afficher dans le bouton, faire un switch case ?
const texteBouton = document.querySelector("filter_button");

switch (texteBouton) {
    case sortByTitle():
      console.log("Afficher idTitre dans le bouton");
      break;
    case sortByPopularity():
        console.log("Afficher idPopularite dans le bouton");
      break;
    case sortByDate():
        console.log("Afficher idDate dans le bouton");
      break;
    default:
        console.log("Afficher idPopularite dans le bouton");
  }