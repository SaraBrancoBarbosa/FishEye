function photographerTemplate(photographer) {
    const { name, portrait, city, country, tagline, media, title, likes } = photographer;

    const profile = `assets/photographers/${portrait}`;
    const medias = `assets/photographers/${media}`;

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

    function getUserMedias() {
        const photographerMedias = document.querySelector('.photograph_medias');

        const figure = document.createElement('figure');

        const imgMedias = document.createElement('img');
        imgMedias.setAttribute('src', medias);

        const figCaption = document.createElement('figcaption');

        const h3 = document.createElement('h3');
        h3.textContent = title;

        const divMediasContent = document.createElement('div');
        divMediasContent.classList.add('like_counter');

        const likesElement = document.createElement('p');
        likesElement.textContent = likes;

        photographerMedias.appendChild(figure);
        figure.appendChild(imgMedias);
        figure.appendChild(figCaption);
        figCaption.appendChild(h3);
        figCaption.appendChild(divMediasContent);
        divMediasContent.appendChild(likesElement);

        return (photographerMedias);
    }

    
    return { name, profile, city, country, tagline, media, title, likes, getUserCardProfile, getUserMedias }
}