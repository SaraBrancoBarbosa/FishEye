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
}

// Open options event by clicking on the button
iconFilter.onclick = () => {
    launchBoxFilter()
}

// Open options event by pressing the enter key
iconFilter.onkeydown = function(e){
    if(e.keyCode == 13){
        launchBoxFilter()
    }
 };

 // Close options event by pressing the escape key
window.addEventListener("keydown",(event) => {
    if (event.key === 'Escape') {
        closeBoxFilter()
    }
  });

/*********** Sort and filter the datas ***********/

// J'hésite à faire un formulaire pour pouvoir inverser la place des trois éléments plus facilement
// => label "trier par", et option value="popularité" par ex
// Ou est-ce que je peux "déplacer" les mots avec la version actuelle (bouton + ul) ?

let populariteId = document.getElementById("popularite");
let dateId = document.getElementById("date");
let titreId = document.getElementById("titre");

for (let i = 0; 1 < medium.length; i++) {
    const media = medium[i];
}

// Filter event.
populariteId.addEventListener("click", function () {
    const mediumSorted = Array.from(medium);
    mediumSorted.sort(function (a, b) {
        return a.likes - b.likes;
    })
    return populariteId;
});

dateId.addEventListener("click", function () {
    const mediumSorted = Array.from(medium);
    mediumSorted.sort(function (a, b) {
        return a.date - b.date;
    })
    return dateId;
});

titreId.addEventListener("click", function () {
    const mediumSorted = Array.from(medium);
    mediumSorted.sort(function (a, b) {
        return a.name - b.name;
    })
    return titreId;
});

// Ensuite pour "choisir" le filtre, faire un switch case ?
// case "title" alors return "titreId". Et par default: return "populariteId"