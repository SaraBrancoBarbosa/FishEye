export function photographerTemplate(photographer) {
    const { name, portrait, city, country, tagline, price } = photographer;

    const profile = `assets/photographers/${portrait}`;

    // Header informations about the photographer
    function getUserCardProfile() {
        const photographerHeader = document.querySelector('.photographer_header');

        const photographerHeaderContent1 = document.createElement('div');
        photographerHeaderContent1.classList.add('photographer_header_content');
        const photographerProfile = document.createElement('div');
        photographerProfile.classList.add('profile');
        photographerProfile.tabIndex = "0";

        const h1 = document.createElement('h1');
        h1.textContent = name;

        const photographerProfileText = document.createElement('div');
        photographerProfileText.classList.add('text');

        const h2 = document.createElement('h2');
        h2.textContent = city + ', ' + country;

        const photographerTaglineElement = document.createElement('p');
        photographerTaglineElement.classList.add('tagline');
        photographerTaglineElement.textContent = tagline;

        const photographerHeaderContent2 = document.createElement('div');
        photographerHeaderContent2.classList.add('photographer_header_content');
        const btnContact = document.querySelector('.contact_button');

        const photographerHeaderContent3 = document.createElement('div');
        photographerHeaderContent3.classList.add('photographer_header_content');
        const photographerImg = document.createElement('img');
        photographerImg.setAttribute('src', profile);
        photographerImg.alt = `${name}`;
        photographerImg.tabIndex = "0";

        photographerHeader.appendChild(photographerHeaderContent1);
        photographerHeader.appendChild(photographerHeaderContent2);
        photographerHeader.appendChild(photographerHeaderContent3);
        photographerHeaderContent1.appendChild(photographerProfile);
        photographerProfile.appendChild(h1);
        photographerProfile.appendChild(photographerProfileText);
        photographerProfileText.appendChild(h2);
        photographerProfileText.appendChild(photographerTaglineElement);
        photographerHeaderContent2.appendChild(btnContact);
        photographerHeaderContent3.appendChild(photographerImg);

        return (photographerHeader);
    }

    // Fonction pour cliquer sur le coeur, mais je comprends pas tout D:
    // Après il faudra aussi ajouter la touche entrée pour l'accessibilité
    /*
    function handleLikesButton() {
        const that = this
        
        this.$wrapper
            .querySelector('.like-on-click')
            .addEventListener('click', function() {
                if (this.classList.contains('wished')) {
                    this.classList.remove('wished')
                    that.TotalLikesSubject.fire('DEC')
                } else {
                    this.classList.add('wished')
                    that.TotalLikesSubject.fire('INC')
                }
            })
    }
    */

    // Maintenant il faut l'appeler dans le fichier /pages/photographer.js ... Mais où ?
    function getPriceTotalLikesBox() {
        const priceBox = document.querySelector('.price-box');
        
        priceBox.innerHTML = `${price}` + '€/jour';

        return priceBox;
    }

    // To get the respective medium for each photographer. It contains the img and video functions
    function getUserMedium(photographer, medium) {
        
        // Cut the names to go to the right folders
        const path = '/assets/photographers/'+(photographer.name.split(' ')[0].replaceAll('-', ' ')+'/small');

        if (medium.video) {
            return getUserVideo(path,medium)
        } 

        //handleLikesButton()
        return getUserImage(path, medium)
    }

    // To get the images
    function getUserImage(path,medium) {

        const {image, title, likes, alt} = medium;
        const template = document.getElementById('template-medium-card-image');

        // On appelle le template du HTML. cloneNode crée un fragment, une balise vide sans nom
        const card = template.content.cloneNode(true);
        const img = card.querySelector('.medium-card_img');
        img.src = `${path}/${image}`;
        img.alt = `${title}.` + ` ${alt}`;
        
        card.querySelector('.medium-card_title').textContent = `${title}`;
        card.querySelector('.medium-card_likes').textContent = `${likes}`;
        
        return card;
    }

    // To get the videos
    function getUserVideo(path,medium) {

        const {title, likes, alt} = medium;
        const template = document.getElementById('template-medium-card-video');
        
        const card = template.content.cloneNode(true);
        const video = card.querySelector('.medium-card_video');
        video.src = `${path}/${medium.video}`;
        video.setAttribute('aria-label', `${alt}`);
        
        card.querySelector('.medium-card_title').textContent = `${title}`;
        card.querySelector('.medium-card_likes').textContent = `${likes}`;

        return card;
    }
   
    return { getUserCardProfile, getUserMedium, getPriceTotalLikesBox}
}