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
let lightboxPath = ''

/*********** Launching and closing lightbox ***********/

const stopMediaPropagation = (event) => { 
    event.stopPropagation();
}

// Cette fonction est intégrée dans pages/photographer.js
export function launchLightboxModal(path, media, index) {
    lightboxModal.style.display = "flex";
    body.style.overflow = "hidden"; 

    wrapper.setAttribute("aria-hidden", true);
    lightboxModalContent.setAttribute("aria-hidden", false);
    lightboxModalContent.setAttribute("aria-modal", false);

    lightboxModal.addEventListener("click", closeLightboxModal); 
    lightboxModal.querySelector(".modal").addEventListener("click", stopMediaPropagation);

    btnCloselightboxModal.focus();

    btnCloselightboxModal.addEventListener("click", closeLightboxModal);

    lightboxMedia = media;
    lightboxPath = path;
    
    openLightboxMedia(index);
}

function openLightboxMedia(index) {
    currentItemPosition = index
    const medium = lightboxMedia[index];
    const figure = document.querySelector('.figure_open-modal');
 
    const video = figure.querySelector('.medium-card_video')
    const img = figure.querySelector('.medium-card_img')
    const title = figure.querySelector('.medium-card_title')
    title.textContent = medium.title;
        
    if (medium.video) {
        video.src = lightboxPath + '/' + medium.video;
        img.style.display = 'none';
        video.style.display = 'flex';
    } else {
        img.src = lightboxPath + '/' + medium.image;
        img.style.display = 'flex';
        video.style.display = 'none';
    }

}

function closeLightboxModal() {
    lightboxModal.style.display = "none";
    body.style.overflow = "auto";

    lightboxModal.setAttribute("aria-hidden", true);
    lightboxModal.setAttribute("aria-modal", true);

    lightboxModal.removeEventListener("click", closeLightboxModal);
    lightboxModal.querySelector(".modal").removeEventListener("click", stopMediaPropagation);

    document.querySelector(".open_modal").focus();
}

// Closes modal by pressing the escape key
window.addEventListener("keydown",(event) => {
    if (event.key === 'Escape') {
        closeLightboxModal()
    }
});

// Or by pressing the enter key on the closing button
btnCloselightboxModal.onkeydown = function(event) {
    if (event.keyCode == 13) {
        closeLightboxModal()
    }
};

/*********** Go to previous and next media ***********/

const goToNextSlide = () => {
    if (currentItemPosition + 1 >=  lightboxMedia.length) {
        currentItemPosition = 0
    } else {
        currentItemPosition += 1
    }
    openLightboxMedia(currentItemPosition);
}

const goToPreviousSlide = () => {
    if (currentItemPosition - 1 >=  0) {
        currentItemPosition -= 1
    } else {
        currentItemPosition = lightboxMedia.length - 1
    }
    openLightboxMedia(currentItemPosition);
}

btnPrev.addEventListener("click", goToPreviousSlide);
btnNext.addEventListener("click", goToNextSlide);

// Go to previous or next media by using the left and right keys
window.onkeydown = function(e){
    if (e.keyCode === 39) {
        goToNextSlide()
    } else if (e.keyCode === 37) {
        goToPreviousSlide()
    }
 };