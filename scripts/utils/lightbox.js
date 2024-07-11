/*********** Elements ***********/

// DOM elements
const lightboxModal = document.querySelector(".lightbox_modal");
const btnCloselightboxModal = document.querySelector(".close_media_button");

/*********** Launching and closing filter ***********/

// Function to prevent further propagation of the current event
const stopMediaPropagation = (event) => { 
    event.stopPropagation();
}

function launchLightboxModal() {
	lightboxModal.style.display = "flex";
    document.body.style.overflow = "hidden"; 
    lightboxModal.addEventListener("click", closeLightboxModal); 
    lightboxModal.querySelector(".modal").addEventListener("click", stopMediaPropagation);

    btnCloselightboxModal.addEventListener("click", closeLightboxModal);
}

function closeLightboxModal() {
    lightboxModal.style.display = "none";
    document.body.style.overflow = "auto";
    lightboxModal.removeEventListener("click", closeLightboxModal);
    lightboxModal.querySelector(".modal").removeEventListener("click", stopMediaPropagation);
}