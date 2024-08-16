// To get the images
export function getUserImage(path,medium) {

    const {image, title, likes, alt} = medium;
    const template = document.getElementById("template-medium-card-image");

    const card = template.content.cloneNode(true);
    const img = card.querySelector(".medium-card_img");
    img.src = `${path}/${image}`;
    img.alt = `${title}.` + ` ${alt}`;
    
    card.querySelector(".medium-card_title").textContent = `${title}`;
    card.querySelector(".medium-card_likes").textContent = `${likes}`;
    
    return card;
}

// To get the videos
export function getUserVideo(path,medium) {

    const {title, likes, alt} = medium;
    const template = document.getElementById("template-medium-card-video");
    
    const card = template.content.cloneNode(true);
    const video = card.querySelector(".medium-card_video");
    video.src = `${path}/${medium.video}`;
    video.setAttribute("aria-label", `${alt}`);
    
    card.querySelector(".medium-card_title").textContent = `${title}`;
    card.querySelector(".medium-card_likes").textContent = `${likes}`;

    return card;
}