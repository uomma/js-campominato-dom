'use strict'

/* FUNCTIONS */


function mioCreaElement(htmlElement, className, htmlValue) {
    const element = document.createElement(htmlElement);
    element.classList.add(className);
    element.innerText = htmlValue;

    element.addEventListener('click', function(){

        alert(htmlValue);
    })
    return element;
}


function myAppendElement(containerElement, htmlElement) {
    containerElement.append(htmlElement);
}

/* MAIN */
let cellNumber = 100;

const containerGrid = document.querySelector('.grid');

for(let i = 1; i <= cellNumber; i++){

    const createdElement = mioCreaElement('div', 'celle-10', i);
    myAppendElement(containerGrid, createdElement);

}