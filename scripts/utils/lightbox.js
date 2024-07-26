import { photographerTemplate } from "../templates/photographer.js"

/*********** Elements ***********/

// DOM elements
const lightboxModal = document.querySelector(".lightbox_modal");
const btnCloselightboxModal = document.querySelector(".close_media_button");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
//const mediaImg = document.querySelector(".medium-card_img");
//const mediaVideo = document.querySelector(".medium-card_video");
const body = document.body;
const wrapper = document.querySelector(".wrapper");

/*********** Launching and closing lightbox ***********/

const stopMediaPropagation = (event) => { 
    event.stopPropagation();
}

// Cette fonction est intégrée dans pages/photographer.js
export function launchLightboxModal() {
    lightboxModal.style.display = "flex";
    body.style.overflow = "hidden"; 

    wrapper.setAttribute("aria-hidden", true);
    lightboxModal.setAttribute("aria-hidden", false);
    lightboxModal.setAttribute("aria-modal", false);

    lightboxModal.addEventListener("click", closeLightboxModal); 
    lightboxModal.querySelector(".modal").addEventListener("click", stopMediaPropagation);

    btnCloselightboxModal.focus();

    btnCloselightboxModal.addEventListener("click", closeLightboxModal);
}

function closeLightboxModal() {
    lightboxModal.style.display = "none";
    body.style.overflow = "auto";

    lightboxModal.setAttribute("aria-hidden", true);
    lightboxModal.setAttribute("aria-modal", true);

    lightboxModal.removeEventListener("click", closeLightboxModal);
    lightboxModal.querySelector(".modal").removeEventListener("click", stopMediaPropagation);
}

// Closes modal by pressing the escape key
window.addEventListener("keydown",(event) => {
    if (event.key === 'Escape') {
        closeLightboxModal()
    }
});

/*********** Go to previous and next media ***********/

let currentItemPosition = 0

const goToNextSlide = () => {
    if (currentItemPosition + 1 >=  mediaImg.length) {
       
        const lastItem = `.item-${currentItemPosition}`
  
        currentItemPosition = 0
        const currentItem = `.item-${currentItemPosition}`
       
        setNodeAttributes(lastItem, currentItem)
    } else {
        currentItemPosition += 1
        const lastItem = `.item-${currentItemPosition - 1}`
        const currentItem = `.item-${currentItemPosition}`
       
        setNodeAttributes(lastItem, currentItem)
    }
}
  
const goToPreviousSlide = () => {
    if (currentItemPosition - 1 >=  0) {
        currentItemPosition -= 1
        const currentItem = `.item-${currentItemPosition}`
        const lastItem = `.item-${currentItemPosition + 1}`
  
        setNodeAttributes(lastItem, currentItem)
    } else {
        const lastItem = `.item-${currentItemPosition}`
       
        currentItemPosition = 2
        const currentItem = `.item-${currentItemPosition}`
       
        setNodeAttributes(lastItem, currentItem)
    }
}

btnPrev.addEventListener("click", goToPreviousSlide);
btnNext.addEventListener("click", goToNextSlide);

// Flèches du clavier
window.addEventListener("keydown",(e) => {
    if (e.key === 39) {
        goToNextSlide()
    } else if (e.key === 37) {
        goToPreviousSlide()
    }
 })

/*********** Display the medium ***********/

// Fournir le tableau des cards
// Récupérer le tableau medium
// Eventuellement faire un filter ou map (pour transformer le tableau de medium en tableau src)