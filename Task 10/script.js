const domElements = {
    countries: document.querySelector('.countries-container'),
    flag: document.querySelector('.flag'),
    name: document.querySelector('.name'),
    capital: document.querySelector('.capital'),
    region: document.querySelector('.region'),
    subRegion: document.querySelector('.sub-region'),
    callCode: document.querySelector('.call-code'),
    population: document.querySelector('.population'),
    demonym: document.querySelector('.demonym'),
    currency: document.querySelector('.currency'),
}



let requestFile = "https://restcountries.eu/rest/v2/all";

const loader = `
<div class = "loader">
    <svg>
        <use href = "img/icons.svg#icon-cw"></use>
    </svg>
</div>
`;

const getCountries = async function() {
    domElements.countries.insertAdjacentHTML('afterbegin', loader);

    try {
        const result = await fetch(requestFile);
        const data = await result.json();
        console.log(data);
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.parentElement.removeChild(loader);
        }

        data.forEach(element => {
            const country = `
            <div class = "country">
                <div class = "flag-img">
                    <img class = "flag" src = "${element.flag}" alt = "${element.name}" />
                </div>
                <div class = "country-content">
                    <p>Name: <span class = "name">${element.name}</span></p>
                    <p>Capital: <span class = "capital">${element.capital}</span></p>
                    <p>Region: <span class = "region">${element.region}</span></p>
                    <p>Sub-region: <span class = "sub-region">${element.subregion}</span></p>
                    <p>Calling Code: <span class = "call-code">${element.callingCodes[0]}</span></p>
                    <p>Population: <span class = "population">${element.population}</span></p>
                    <p>Demonym: <span class = "demonym">${element.demonym}</span></p>
                    <p>Currency: <span class = "currency">${element.currencies[0].name}</span></p>
                </div>
            </div>`;

            domElements.countries.insertAdjacentHTML('beforeend', country);
        });
    } catch (error) {
        console.log(error);
    }
}

// getCountries();

// let countriesData;
// getCountries().then(data => {
//     countriesData = data;
//     return countriesData;
// })

window.addEventListener('load', getCountries);