/*********** Elements ***********/

// DOM elements
const lightboxModal = document.querySelector(".lightbox_modal");
const imgOpenModal = document.querySelector(".open_modal");
const btnCloselightboxModal = document.querySelector(".close_media_button");

/*********** Launching and closing lightbox ***********/

// Function to prevent further propagation of the current event
const stopMediaPropagation = (event) => { 
    event.stopPropagation();
}

function launchLightboxModal() {
	lightboxModal.style.display = "flex";
    document.body.style.overflow = "hidden"; 
    lightboxModal.addEventListener("click", closeLightboxModal); 
    lightboxModal.querySelector(".lightbox_media").addEventListener("click", stopMediaPropagation);

    btnCloselightboxModal.addEventListener("click", closeLightboxModal);

}

function closeLightboxModal() {
    lightboxModal.style.display = "none";
    document.body.style.overflow = "auto";
    lightboxModal.removeEventListener("click", closeLightboxModal);
    lightboxModal.querySelector(".modal").removeEventListener("click", stopMediaPropagation);
}

// Launches modal event by clicking on the button
//imgOpenModal.forEach((btn) => btn.addEventListener("click", launchLightboxModal));
imgOpenModal.addEventListener("click", launchLightboxModal);