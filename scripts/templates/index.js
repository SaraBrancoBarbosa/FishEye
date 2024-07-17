export function indexTemplate(photographer) {
    const { id, name, portrait, city, country, tagline, price } = photographer;

    const profile = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const divMain = document.createElement('div');
        divMain.classList.add('div_main');

        const link = document.createElement('a');
        link.href = `/photographer.html?id=${id}`;
        link.setAttribute('aria-label', "Découvrir son travail")
        
        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.setAttribute('src', profile);
        img.alt = "";

        const figCaption = document.createElement('figcaption');
     
        const h2 = document.createElement('h2');
        h2.textContent = name;

        const divContent = document.createElement('div');
        divContent.classList.add('div_content');

        const h3 = document.createElement('h3');
        h3.textContent = city + ', ' + country;

        const taglineElement = document.createElement('p');
        taglineElement.classList.add('tagline');
        taglineElement.textContent = tagline;

        const priceElement = document.createElement('p');
        priceElement.classList.add('price');
        priceElement.textContent = price + '€/jour';

        divMain.appendChild(link);
        link.appendChild(figure);
        figure.appendChild(img);
        figure.appendChild(figCaption);
        figCaption.appendChild(h2);
        divMain.appendChild(divContent);
        divContent.appendChild(h3);
        divContent.appendChild(taglineElement);
        divContent.appendChild(priceElement);

        return (divMain);
    }
    return { getUserCardDOM }
}