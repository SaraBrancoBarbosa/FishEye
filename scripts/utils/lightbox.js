/*********** Elements ***********/

// DOM elements
const lightboxModal = document.querySelector(".lightbox_modal");
const lightboxModalContent = document.querySelector(".modal");
const btnCloselightboxModal = document.querySelector(".close_media_button");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const body = document.body;
const wrapper = document.querySelector(".wrapper");

// Lightbox elements
let lightboxMedia = [];
let currentItemPosition = 0
let lightboxPath = ""

/*********** Launching and closing lightbox ***********/

const stopMediaPropagation = (event) => { 
    event.stopPropagation();
}

// Cette fonction est intégrée dans pages/photographer.js
export function launchLightboxModal(pPath, pMedia, pMediaId) {
    lightboxModal.style.display = "flex";
    body.style.overflow = "hidden"; 

    wrapper.setAttribute("aria-hidden", true);
    lightboxModalContent.setAttribute("aria-hidden", false);
    lightboxModalContent.setAttribute("aria-modal", false);

    lightboxModal.addEventListener("click", closeLightboxModal); 
    lightboxModal.querySelector(".modal").addEventListener("click", stopMediaPropagation);

    btnCloselightboxModal.focus();

    btnCloselightboxModal.addEventListener("click", closeLightboxModal);

    lightboxMedia = pMedia;
    lightboxPath = pPath;
    
    // On trouve dans le tableau media avec indexOf
    openLightboxMedia(pMedia.indexOf(pMedia.find(m => m.id === pMediaId)));
}

// Closes modal by pressing the escape key
const closeOnEscape = (e) => {
    if (e.key === "Escape") {
        closeLightboxModal()
    }
};

// Or by pressing the enter key on the closing button
btnCloselightboxModal.onkeydown = function(e){
    if(e.key === "Enter"){
        closeLightboxModal()
    }
 };

// Go to previous or next media by using the enter key (on the icons)
const navigate = e => {
    if (e.key == "ArrowLeft") {
        goToPreviousSlide()
    } else if (e.key == "ArrowRight") {
        goToNextSlide()
    }
}

function openLightboxMedia(index) {
    currentItemPosition = index
    const medium = lightboxMedia[index];
    const figure = document.querySelector(".figure_open-modal");
 
    const video = figure.querySelector(".medium-card_video")
    const img = figure.querySelector(".medium-card_img")
    const title = figure.querySelector(".medium-card_title")
    title.textContent = medium.title;
    img.alt = medium.title;
    
        
    if (medium.video) {
        video.src = lightboxPath + "/" + medium.video;
        img.style.display = "none";
        video.style.display = "flex";
    } else {
        img.src = lightboxPath + "/" + medium.image;
        img.style.display = "flex";
        video.style.display = "none";
    }
}

function closeLightboxModal() {
    lightboxModal.style.display = "none";
    body.style.overflow = "auto";

    lightboxModal.setAttribute("aria-hidden", true);
    lightboxModal.setAttribute("aria-modal", true);

    lightboxModal.removeEventListener("click", closeLightboxModal);
    lightboxModal.querySelector(".modal").removeEventListener("click", stopMediaPropagation);

    window.removeEventListener("keydown", closeOnEscape);
    window.removeEventListener("keydown", navigate);

    document.querySelector(".open_modal").focus();
}

/*********** Go to previous and next media ***********/

const goToNextSlide = () => {
    openLightboxMedia((currentItemPosition + 1) % lightboxMedia.length);
}

const goToPreviousSlide = () => {
    if (currentItemPosition - 1 >=  0) {
        currentItemPosition -= 1
    } else {
        currentItemPosition = lightboxMedia.length - 1
    }
    // On ne peut pas faire de % sur du négatif
    openLightboxMedia((currentItemPosition - 1 + lightboxMedia.length) % lightboxMedia.length);
}

btnPrev.addEventListener("click", goToPreviousSlide);
btnNext.addEventListener("click", goToNextSlide);

// Go to previous or next media by using the left and right keys
window.addEventListener("keydown", e => {
    if (e.key == "ArrowLeft") {
        goToPreviousSlide();
    } else if (e.key == "ArrowRight") {
        goToNextSlide();
    }
})