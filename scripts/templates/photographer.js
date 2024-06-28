function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const figure = document.createElement('figure');

        const figureMain = document.createElement('div');
        figureMain.setAttribute("class", "figure_main");

        const figureContent = document.createElement('div');
        figureContent.setAttribute("class", "figure_content");

        const img = document.createElement('img');
        img.setAttribute("src", picture)

        const h2 = document.createElement('h2');
        h2.textContent = name;

        const h3 = document.createElement('h3');
        h3.textContent = city + ', ' + country;

        const taglineElement = document.createElement('p');
        taglineElement.textContent = tagline;

        const priceElement = document.createElement('p');
        priceElement.setAttribute("class", "figure_content_price");
        priceElement.textContent = price + '€/jour';

        figure.appendChild(figureMain);
        figure.appendChild(figureContent);
        figureMain.appendChild(img);
        figureMain.appendChild(h2);
        figureContent.appendChild(h3);
        figureContent.appendChild(taglineElement);
        figureContent.appendChild(priceElement);

        return (figure);
    }
    return { name, picture, getUserCardDOM }
}