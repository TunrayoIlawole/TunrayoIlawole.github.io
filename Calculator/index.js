const display = calculator.display;
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const calculate = document.querySelector(".equal");


const insertVal = (element) => {
    display.value += element;
}


calculate.addEventListener("click", function() {
    display.value = eval(display.value);
})

clear.addEventListener("click", function() {
    display.value = "";
})