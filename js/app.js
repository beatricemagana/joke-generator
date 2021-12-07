'use strict';


const jokeSection = document.querySelector('.joke');
const jokeFail = 'Error. Please try again.';
const btn = document.querySelector('.btn');

btn.addEventListener('click', tellJoke);

function clear() {
    jokeSection.textContent = '';
};

function appendContent(parent, child) {
    parent.appendChild(child)
};

function tellJoke() {
    fetch('https://sv443.net/jokeapi/v2/joke/programming,miscellaneous').then(res => {
        return res.json();
    }).then(data => {
        console.log(data);
        if (data.flags.racist === true) {
            clear()

            const section = document.createElement('section');
            section.classList.add('censored');
            section.textContent = jokeFail;
            appendContent(jokeSection, section);

        } else if (data.flags.sexist === true) {
            clear()

            const section = document.createElement('section');
            section.classList.add('censored');
            section.textContent = jokeFail;
            appendContent(jokeSection, section);

        } else if (data.flags.nsfw === true) {
            clear()

            const section = document.createElement('section');
            section.classList.add('censored');
            section.innerHTML = jokeFail;
            appendContent(jokeSection, section);

        } else if (data.joke) {
            clear()
            
            let joke = data.joke;
            const singleSection = document.createElement('section');
            singleSection.classList.add('single-joke');
            singleSection.textContent = joke;
            appendContent(jokeSection, singleSection);


        } else {
            clear()

            let setup = data.setup;
            const setupSection = document.createElement('section');
            setupSection.classList.add('setup')
            setupSection.innerHTML = setup;
            appendContent(jokeSection, setupSection);


            let delivery = data.delivery;
            const deliverySection = document.createElement('section');
            deliverySection.classList.add('delivery')
            deliverySection.textContent = delivery;
            appendContent(jokeSection, deliverySection);
        }
    })
};



