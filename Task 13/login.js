const domElements3 = {
    form: document.querySelector('form'),
    email:document.getElementById('email'),
    password: document.getElementById('password'),
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

function checkEmail(input) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(input.value.trim())) {
        showSuccess(input);
        return true;
    }
    else {
        showError(input, 'Email is not valid');
        return false
    }
}

// Check Password 
function checkPassword(input) {
    if(input.value.length < 8) {
        showError(input, 'Password must be at least 8 characters long');
        return false;
    }
    else {
        showSuccess(input);
        return true;
    }
}

let validInputs = [];

[domElements3.email, domElements3.password].forEach(input => {
    input.addEventListener('change', () => {
        if(input.required) {
            let isValid;
            if (input.type === 'email') {
                isValid = checkEmail(input);
            }
            else if (input.type === 'password') {
                isValid = checkPassword(input);
            }


            if(isValid) {
                validInputs.push(input);
            }


            if (validInputs.length >= 1) {
                domElements3.submit.disabled = false;
            }

            else {
                domElements3.submit.disabled = true;
            }

            console.log(validInputs);
        }
    })
});

domElements3.form.addEventListener('submit', function(e) {
    // alert('Submitted');
    e.preventDefault();
    domElements3.submit.innerHTML = `<div class="loader"></div>`;
    setTimeout(function() {
        domElements3.submit.textContent = `Login`;
    }, 2000);

    const inputs = Array.from(document.querySelectorAll('.input'));

    validInputs = [];
    
    const values = {};

    inputs.forEach(input => {
        values[input.name] = input.value
    });

    console.log(values);

    fetch('https://jsminnastore.herokuapp.com/auth/login/', {
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
    
});