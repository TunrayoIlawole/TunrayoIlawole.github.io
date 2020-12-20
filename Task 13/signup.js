const domElements2 = {
    form: document.querySelector('form'),
    fullName: document.getElementById('full-name'),
    email: document.getElementById('email'),
    address: document.getElementById('address'),
    phone: document.getElementById('tel-num'),
    gender: document.getElementById('gender'),
    password: document.getElementById('password'),
    password2: document.getElementById('password2'),
    checkbox: document.getElementById('checkbox'),
    submit: document.querySelector('.sign-up')
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


// check text inputs
function checkText(input) {
    const regex = /^\d+$/;
    if (input.value.match(regex)) {
        showError(input, 'This field cannot contain numbers');
        return false;
    }
    else {
        showSuccess(input);
        return true;
    }
}

// Check email 
function checkEmail(input) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(input.value.trim())) {
        showSuccess(input);
        return true;
    }
    else {
        showError(input, 'Email is not valid');
        return false;
    }
}

function checkNumber(input) {
    const regex2 = /^\d+$/;
    if(input.value.match(regex2)) {
        showSuccess(input);
        return true;
    }
    else {
        showError(input, 'Phone number is not valid');
        return false;
    }
}

function checkSelect(input) {
    const itValue = input.options[input.selectedIndex].value;
    console.log(itValue);
    if (itValue === 'Select Gender') {
        input.classList.remove('success');
        return false;
    }
    else {
        input.classList.add('success');
        return true;
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

// Check if Passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
        return false
    }
    else {
        return true;
    }
}

// Check checkbox
function checkCheckbox(input) {
    if(domElements2.checkbox.checked == true) {
        showSuccess(input);
        return true;
    }
    else {
        showError(input, 'You need to check the box');
        return false;
    }
}

let validInputs = [];

[domElements2.fullName, domElements2.email, domElements2.address, domElements2.phone, domElements2.gender, domElements2.password, domElements2.password2, domElements2.checkbox].forEach(input => {
    input.addEventListener('change', () => {
        if(input.required) {
            let isValid;
            if(input.type === 'text') {
                isValid = checkText(input);
            }
            else if (input.type === 'email') {
                isValid = checkEmail(input);
            }
            else if (input.type === 'tel') {
                isValid = checkNumber(input)
            }
            else if (input.type === 'password') {
                isValid = checkPassword(input) && checkPasswordsMatch(domElements2.password, domElements2.password2);
            }
            else if (input.type === 'checkbox') {
                isValid = checkCheckbox(input);
            }
            else if (input === domElements2.gender) {
                isValid === checkSelect(domElements2.gender);
                console.log(isValid);
            }
    
            if(isValid) {
                validInputs.push(input);
            }
    
            if (validInputs.length >= 6) {
                domElements2.submit.disabled = false;
            }
            else {
                domElements2.submit.disabled = true;
            }
    
            console.log(validInputs);
        }
    })
});


domElements2.form.addEventListener('submit', function(e) {
    e.preventDefault();
    domElements2.submit.innerHTML = `<div class="loader"></div>`;
    setTimeout(function() {
        domElements2.submit.textContent = `Sign Up`;
    }, 2000);

    const inputs = Array.from(document.querySelectorAll('.input'));

    validInputs = [];
    
    const values = {};

    inputs.forEach(input => {
        values[input.name] = input.value
    });

    console.log(values);

    fetch('https://jsminnastore.herokuapp.com/auth/signup', {
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