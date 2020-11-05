const navLink = document.querySelector('.mid-nav');
const toggleButton = document.querySelector('.nav-link-toggle');
const buttonToggle = document.querySelector('.toggle-button');

const displayNav = () => {
    navLink.classList.toggle('nav-show');
    if (navLink.classList.contains('nav-show')) {
        buttonToggle.src = "images/icon-close.svg";
    }
    else {
        buttonToggle.src = "images/icon-hamburger.svg";
    }
}

buttonToggle.addEventListener('click', displayNav);