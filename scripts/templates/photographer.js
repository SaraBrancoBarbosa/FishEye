function photographerTemplate(photographer) {
    const { name, portrait, city, country, tagline, media } = photographer;

    const profile = `assets/photographers/${portrait}`;
    //const medias = `assets/photographers/${media}`;

    // Header informations about the photographer
    function getUserCardProfile() {
        const photographerHeader = document.querySelector('.photographer_header');

        const photographerProfile = document.createElement('div');
        photographerProfile.classList.add('profile');

        const h1 = document.createElement('h1');
        h1.textContent = name;

        const photographerProfileText = document.createElement('div');
        photographerProfileText.classList.add('text');

        const h2 = document.createElement('h2');
        h2.textContent = city + ', ' + country;

        const photographerTaglineElement = document.createElement('p');
        photographerTaglineElement.classList.add('tagline');
        photographerTaglineElement.textContent = tagline;

        const btnContact = document.querySelector('.contact_button');

        const photographerImg = document.createElement('img');
        photographerImg.setAttribute('src', profile);

        photographerHeader.appendChild(photographerProfile);
        photographerProfile.appendChild(h1);
        photographerProfile.appendChild(photographerProfileText);
        photographerProfileText.appendChild(h2);
        photographerProfileText.appendChild(photographerTaglineElement);
        photographerHeader.appendChild(btnContact);
        photographerHeader.appendChild(photographerImg);

        return (photographerHeader);
    }

    // To get the respective medium for each photographer. It contains the img and video functions
    function getUserMedium(photographer, medium) {
        
        // Cut the names to go to the right folders
        const path = '/assets/photographers/'+(photographer.name.split(' ')[0].replaceAll('-', ' '));

        if (medium.video) {
            return getUserVideo(path,medium)
        } 
        return getUserImage(path, medium)
    }

    // To get the images
    function getUserImage(path,medium) {

        const {image, title, likes} = medium;
        const template = document.getElementById('template-medium-card-image');

        // On appelle le template du HTML. cloneNode crée un fragment, une balise vide sans nom
        const card = template.content.cloneNode(true);
        const img = card.querySelector('.medium-card_img');
        img.src = `${path}/${image}`;
        
        card.querySelector('.medium-card_title').textContent = `${title}`;
        card.querySelector('.medium-card_likes').textContent = `${likes}`;
        
        return card;
    }

    // To get the videos
    function getUserVideo(path,medium) {

        const {videos, title, likes} = medium;
        const template = document.getElementById('template-medium-card-video');
        
        const card = template.content.cloneNode(true);
        const video = card.querySelector('.medium-card_video');
        video.src = `${path}/${medium.video}`;

        card.querySelector('.medium-card_title').textContent = `${title}`;
        card.querySelector('.medium-card_likes').textContent = `${likes}`;

        return card;
    }
   
    return { getUserCardProfile, getUserMedium }
}