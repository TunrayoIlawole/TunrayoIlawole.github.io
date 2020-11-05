const form = document.querySelector('form');
const email = document.getElementById('email');
const password = document.getElementById('password');
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


const validInputs = [];

[email, password].forEach(input => {
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


            if (validInputs.length === 2) {
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
        submit.textContent = `Login`;
    }, 2000);
    
});