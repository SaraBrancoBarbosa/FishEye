function photographerTemplate(photographer) {
    const { name, portrait, city, country, tagline } = photographer;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const photographHeader = document.querySelector('.photograph_header');

        const photographProfile = document.createElement('div');
        photographProfile.classList.add('profile');

        const h1 = document.createElement('h1');
        h1.textContent = name;

        const photographProfileText = document.createElement('div');
        photographProfileText.classList.add('text');

        const h2 = document.createElement('h2');
        h2.textContent = city + ', ' + country;

        const photographerTaglineElement = document.createElement('p');
        photographerTaglineElement.classList.add('tagline');
        photographerTaglineElement.textContent = tagline;

        const btnContact = document.querySelector('.contact_button');

        const photographerImg = document.createElement('img');
        photographerImg.setAttribute('src', picture);

        photographHeader.appendChild(photographProfile);
        photographProfile.appendChild(h1);
        photographProfile.appendChild(photographProfileText);
        photographProfileText.appendChild(h2);
        photographProfileText.appendChild(photographerTaglineElement);
        photographHeader.appendChild(btnContact);
        photographHeader.appendChild(photographerImg);

        return (photographHeader);
    }
    return { name, picture, city, country, tagline, getUserCardDOM }
}