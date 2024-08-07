export function totalLikesMedia() {    

    // Fonction pour mettre à jour l'affichage des likes
    function updateLikeDisplay(pContainer) {
        const likeCount = pContainer.querySelector(".medium-card_likes");

        // Récupère le nombre de likes du localStorage
        const likes = localStorage.getItem(pContainer.dataset.id);
        // Met à jour l'affichage
        likeCount.textContent = likes;
    }
        
    // Initialisation des likes à partir du localStorage
    document.querySelectorAll(".card").forEach(pContainer => {
        // Met à jour l'affichage pour chaque image
        updateLikeDisplay(pContainer);

        const likeIcon = pContainer.querySelector(".like_icon");
        likeIcon.addEventListener("click", () => {
            const currentLikes = parseInt(localStorage.getItem(pContainer.dataset.id));
            let newLikes;

            // Vérifie si le bouton est déjà ''liké''
            if (likeIcon.classList.contains("liked")) {
                // Si oui, on enlève le like
                newLikes = currentLikes - 1;
                likeIcon.classList.remove("liked");
                likeIcon.setAttribute("aria-label", "J'ai enlevé mon like");
            } else {
                // Sinon, on ajoute un like
                newLikes = currentLikes + 1;
                likeIcon.classList.add("liked");
                likeIcon.setAttribute("aria-label", "J'ai ajouté un like");
            }

            // Met à jour le localStorage
            localStorage.setItem(pContainer.dataset.id, newLikes);
            // Met à jour l'affichage
            updateLikeDisplay(pContainer);
        });
    });

    // Pour la box en bas à droite, n'a pas été appelée pour le moment
    function getPriceTotalLikesBox() {
        const priceBox = document.querySelector(".price-box");
        const likeCounter = document.querySelector(".like-count");
        
        priceBox.innerHTML = `${price}` + "€/jour";
        priceBox.tabIndex = "0";

        return priceBox;
    }
}