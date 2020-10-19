const navLink = document.querySelector('.right-nav');
const toggleButton = document.querySelector('.nav-link-toggle');

const displayNav = () => {
    navLink.classList.toggle('nav-show');
    if (navLink.classList.contains('nav-show')) {
        toggleButton.innerHTML = '<i class="fas fa-times">';
    }
    else {
        toggleButton.innerHTML = '<i class="fas fa-bars">';
    }
}

toggleButton.addEventListener('click', displayNav);
