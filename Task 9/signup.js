const form = document.querySelector('form');
const fname = document.getElementById('first-name');
const lname = document.getElementById('last-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const checkbox = document.getElementById('checkbox');
const submit = document.querySelector('button');



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
    const regex = /^[a-zA-Z!@#\$%\^\&*\)\(+=._-]+$/g;
    if (regex.test(input.value.trim())) {
        showSuccess(input);
        return true
    }
    else {
        showError(input, 'This field cannot contain numbers');
        return false
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
    if(checkbox.checked == true) {
        showSuccess(input);
        return true;
    }
    else {
        showError(input, 'You need to check the box');
        return false;
    }
}


const validInputs = [];

[fname, lname, email, password, password2, checkbox].forEach(input => {
    input.addEventListener('change', () => {
        if(input.required) {
            let isValid;
            if(input.type === 'text') {
                isValid = checkText(input);
            }
            else if (input.type === 'email') {
                isValid = checkEmail(input);
            }
            else if (input.type === 'password') {
                isValid = checkPassword(input) && checkPasswordsMatch(password, password2);
            }
            else if (input.type === 'checkbox') {
                isValid = checkCheckbox(input);
            }

            if(isValid) {
                validInputs.push(input);
            }
            // else {
            //     validInputs.delete(input);
            // }

            if (validInputs.length === 5) {
                submit.disabled = false;
            }
            else {
                submit.disabled = true;
            }

            console.log(validInputs);
        }
    })
})




form.addEventListener('submit', function(e) {
    // alert('Submitted');
    e.preventDefault();
    submit.innerHTML = `<div class="loader"></div>`;
    setTimeout(function() {
        submit.textContent = `Sign Up`;
    }, 2000);
    
});