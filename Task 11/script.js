const domElements = {
    directories: document.querySelector('.main'),
    number: document.querySelector('.number'),
    nameSearch: document.querySelector('input'),
    loader: document.querySelector('.loader'),
}


let requestFile = "https://raw.githubusercontent.com/AbdullahiAbdulkabir/js_mx_json/main/numbers.json";

const loader = `
<div class = "loader">
    <svg>
        <use href = "assets/icons.svg#icon-cw"></use>
    </svg>
</div>
`;


const getNumbers = async function() {
    domElements.loader.insertAdjacentHTML('afterbegin', loader);
    try {
        const result = await fetch(requestFile);
        const data = await result.json();
        console.log(data);
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.parentElement.removeChild(loader);
        }

        data.forEach(element => {
            const number = `
            <div class = "item-container">
                <div class = "item-details">
                    <p class = "item-name">${element.name}</p>
                    <p class = "item-number">${element.number}</p>
                </div>
                <a class = "icon-container" href = "#">
                    <img src = "assets/telephone-auricular-with-cable.svg" />
                </a>
            </div>`;

            domElements.directories.insertAdjacentHTML('beforeend', number);
        });
    }
    catch(error) {
        alert(error);
    }
}


const searchByName = async function() {
    domElements.directories.innerHTML = "";
    let value = domElements.nameSearch.value.toLowerCase();
    try {
        const result = await fetch(requestFile);
        const data = await result.json();

        const returnedData = data.filter(function(word) {
            return word.name.toLowerCase().includes(value);

        });

        returnedData.forEach(data => {
            const number = `
            <div class = "item-container">
                <div class = "item-details">
                    <p class = "item-name">${data.name}</p>
                    <p class = "item-number">${data.number}</p>
                </div>
                <a class = "icon-container" href = "#">
                    <img src = "assets/telephone-auricular-with-cable.svg" />
                </a>
            </div>`;

            domElements.directories.insertAdjacentHTML('beforeend', number);
        });

        console.log(returnedData);
    } 
    catch (error) {
        console.log(error);
    }
}



window.addEventListener('load', getNumbers);

domElements.nameSearch.addEventListener('input', searchByName);

domElements.directories.addEventListener('click', (e) => {
    if(e.target.closest('.icon-container')) {
        let number = e.target.parentElement.parentElement.firstElementChild.lastElementChild.textContent;

        domElements.number.textContent = number;
    }
})