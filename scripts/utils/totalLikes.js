const updateLikeElement = (card, inc) => {
    const likeElement = card.querySelector(".medium-card_likes");
    likeElement.textContent = parseInt(+likeElement.textContent) + inc;
}

const likeMedia = (card, id, likeIds) => {
    updateLikeElement(card, 1);
    likeIds.push(id)
    localStorage.setItem("likes", JSON.stringify(likeIds))
    card.querySelector(".like_icon").style.color = "#DB8876";
    card.querySelector(".like_icon").setAttribute("aria-label", "Média liké");
}

const unLikeMedia = (card, id, likeIds) => {
    updateLikeElement(card, -1);
    localStorage.setItem("likes", JSON.stringify(likeIds.filter(i => i!==id)))
    card.querySelector(".like_icon").style.color = "#901C1C";
    card.querySelector(".like_icon").setAttribute("aria-label", "Média unliké");
}

const updateLikeMedia = (card, id) => {
    const ls = localStorage.getItem("likes");
    if (ls) {
        const likesArray = JSON.parse(ls);
        if (likesArray.includes(id)) {
            unLikeMedia(card, id, likesArray);
        } else {
            likeMedia(card, id, likesArray)
        }
    } else {
        likeMedia(card, id, []);
    }
    updateGlobalLikes()
}

const updateGlobalLikes = () => {
    const likeCounter = document.querySelector(".like-count");
    const elements = [...document.querySelectorAll(".medium-card_likes")]
    let likes = 0
    elements.forEach(element => likes += (+element.textContent))
    
    likeCounter.textContent = likes
}

export function totalLikesMedia() {    
    const ls = localStorage.getItem("likes") ?? "[]"
    const likesArray = JSON.parse(ls)

    // Likes initialisation with localStorage
    document.querySelectorAll(".card").forEach(card => {
        if (likesArray.includes(card.id)) {
            updateLikeElement(card, 1)
        }

        const likeIcon = card.querySelector(".like_icon");
        likeIcon.addEventListener("click", () => {
            updateLikeMedia(card, card.id);
        })    
        
        likeIcon.onkeydown = function(e){
            if (e.key === "Enter") {
            updateLikeMedia(card, card.id); }
        };
    });

    updateGlobalLikes()
}

export function getPriceTotalLikesBox(price) {
    const priceBox = document.querySelector(".price-box");
    
    priceBox.textContent = `${price} €/jour`;
    priceBox.tabIndex = "0";

    return priceBox;
}
