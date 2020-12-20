// const axios = require('axios');

const domElements4 = {
    form: document.querySelector('form'),
    itemName: document.getElementById('item-name'),
    itemDesc: document.getElementById('item-description'),
    itemCategory: document.getElementById('item-category'),
    reason: document.getElementById('reason'),
    submit: document.querySelector('button')
}

function showSuccess(input) {
    const formInput = input.parentElement;
    // formInput.classList.add('success');
    formInput.className = 'form-input success';
}

function showError(input, message) {
    const formInput = input.parentElement;
    // formInput.classList.add('error');
    formInput.className = 'form-input error';
    const small = formInput.querySelector('small');
    small.textContent = message;
}

function checkText(input) {
    if(input.value.trim() === '') {
        showError(input, 'This field cannot be empty');
        return false;
    }
    else {
        showSuccess(input);
        return true;
    }
}


let validInputs = [];

[domElements4.itemName, domElements4.itemDesc, domElements4.itemCategory, domElements4.reason].forEach(input => {
    input.addEventListener('change', () => {
        if(input.required) {
            let isValid;
            if (input.type === 'text') {
                isValid = checkText(input);
            }


            if(isValid) {
                validInputs.push(input);
            }


            if (validInputs.length >= 3) {
                domElements4.submit.disabled = false;
            }
            else {
                domElements4.submit.disabled = true;
            }

            console.log(validInputs);
        }
    })
});

domElements4.form.addEventListener('submit', function(e) {
    e.preventDefault();
    domElements4.submit.innerHTML = `<div class="loader"></div>`;
    setTimeout(function() {
        domElements4.submit.textContent = `Suggest`;
    }, 2000);
    
    const inputs = Array.from(document.querySelectorAll('.input'));

    validInputs = [];
    
    const values = {};

    inputs.forEach(input => {
        values[input.name] = input.value
    });

    console.log(values);

    fetch('https://jsminnastore.herokuapp.com/suggest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(values),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(function(error) {
        console.log('Request failed', error);
    });

    // axios.post(
    //     'https://jsminnastore.herokuapp.com/suggest',
    //     values,
    // )
    // .then(() => {
    //     alert('success');
    // })
    // .catch(() => {
    //     alert('error');
    // })
});