import config from './config';

const phoneInput = document.getElementById('phone');
const countryField = document.getElementById('country-field');
const countryInput = document.getElementById('country');
const countryList = document.getElementById('country-list');
const countryLabel = document.getElementById('country-label');

function onInput(event) {
    if (event.currentTarget.value.length > 0) {
        event.currentTarget.parentNode.classList.add(`field__dirty`);
    } else {
        event.currentTarget.parentNode.classList.remove(`field__dirty`);
    }
}

function onFocus(event) {
    event.currentTarget.parentNode.classList.toggle('field__focused');
}

function onBlur(event) {
    event.currentTarget.parentNode.classList.toggle('field__focused');
}

document.querySelectorAll('.field__input').forEach((node) => {
    node.addEventListener('focus', onFocus);
    node.addEventListener('blur', onBlur);
});

phoneInput.addEventListener('input', onInput);

// countryField.addEventListener('click');

countryInput.addEventListener('input', onInput);

countryList.addEventListener('mouseover', (event) => {
    countryLabel.innerText = event.target.getAttribute('data-name');
});

countryList.addEventListener('click', (event) => {
    console.log('AYE');
    countryInput.value = event.target.getAttribute('data-name');
});

countryList.addEventListener('mouseleave', () => {
    countryLabel.innerText = 'Country';
});

const fragment = document.createDocumentFragment();

config.countries.forEach(function onEach(country) {
    const li = document.createElement('li');

    const flag = document.createElement('span');
    flag.innerText = country.emoji;
    flag.className = 'flag';

    const countryName = document.createElement('span');
    countryName.innerText = country.name;
    countryName.className = 'country-name';

    const dialCode = document.createElement('span');
    dialCode.innerText = country.dialCode;
    dialCode.className = 'code';

    li.appendChild(flag);
    li.appendChild(countryName);
    li.appendChild(dialCode);
    li.setAttribute('data-name', country.name);

    fragment.appendChild(li);
});

countryList.appendChild(fragment);
