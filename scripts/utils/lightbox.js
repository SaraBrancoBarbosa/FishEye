//export async function lightboxModalElements () {
    /*********** Elements ***********/

    // DOM elements
    const lightboxModal = document.querySelector(".lightbox_modal");
    const backgroundHtml = document.body;
    const btnCloselightboxModal = document.querySelector(".close_media_button");
    const btnPrev = document.querySelector(".btn-prev");
    const btnNext = document.querySelector("btn-next");

    /*********** Launching and closing lightbox ***********/

    // Function to prevent further propagation of the current event
    const stopMediaPropagation = (event) => { 
        event.stopPropagation();
    }

    // Cette fonction est intégrée dans pages/photographer.js
    export function launchLightboxModal() {
        lightboxModal.style.display = "flex";
        backgroundHtml.style.overflow = "hidden"; 
        backgroundHtml.setAttribute = ("aria-hidden", true);
        lightboxModal.addEventListener("click", closeLightboxModal); 
        lightboxModal.querySelector(".modal").addEventListener("click", stopMediaPropagation);}

    function closeLightboxModal() {
        lightboxModal.style.display = "none";
        backgroundHtml.style.overflow = "auto";
        backgroundHtml.setAttribute = ("aria-hidden", false);
        lightboxModal.removeEventListener("click", closeLightboxModal);
        lightboxModal.querySelector(".modal").removeEventListener("click", stopMediaPropagation);
    }

    // Closes modal by pressing the escape key
    window.addEventListener("keydown",(event) => {
        if (event.key === 'Escape') {
            closeLightboxModal()
        }
    });

    btnCloselightboxModal.addEventListener("click", closeLightboxModal);

    //figureOpenModal.addEventListener("click", launchLightboxModal);

    /*********** Launching and closing lightbox ***********/
//}