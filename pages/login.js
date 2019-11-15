import config from '../config';
import './login.scss';
import logoSvg from '../assets/logo.svg';
import downMark from '../assets/icons/down_svg.html';
import { renderSvg } from '../utils/renderSvg';
import { openPopup, hidePopup } from '../utils/popup';
import { prepareRipple } from '../utils/ripple';
import { navigate } from '../router';

export function render(state) {
    function onInput(event) {
        if (event.currentTarget.value.length > 0) {
            event.currentTarget.parentNode.classList.add('field__dirty');

            if (
                phoneInput.value.length &&
                countryField.firstChild.value.length
            ) {
                btn.classList.add('submit__visible');
            }
        } else {
            event.currentTarget.parentNode.classList.remove('field__dirty');
            btn.classList.remove('submit__visible');
        }
    }

    function buildCountryField() {
        const countryList = document.createElement('ul');
        countryList.id = 'country-list';
        countryList.className = 'field__dropdown';

        countryList.addEventListener('mouseover', (event) => {
            countryLabel.innerText = event.target.getAttribute('data-name');
        });

        countryList.addEventListener('mousedown', (event) => {
            countryInput.value = event.target.getAttribute('data-name');
            countryField.classList.add('field__dirty');

            phoneInput.value = event.target.getAttribute('data-code');
            phoneField.classList.add('field__dirty');

            setTimeout(() => phoneInput.focus(), 0);

            hidePopup();
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
            li.setAttribute('data-code', country.dialCode);

            fragment.appendChild(li);
        });

        countryList.appendChild(fragment);

        const countryField = document.createElement('div');
        countryField.id = 'country-field';
        countryField.className = 'field';

        const countryInput = document.createElement('input');
        countryInput.autocomplete = 'off';
        countryInput.required = true;
        countryInput.className = 'field__input';
        countryInput.id = 'country';
        countryInput.type = 'text';
        countryInput.addEventListener('input', onInput);
        countryInput.addEventListener('blur', () => {
            if (!countryInput.value) {
                countryLabel.innerText = 'Country';
            }
        });

        const countryLabel = document.createElement('label');
        countryLabel.id = 'country-label';
        countryLabel.setAttribute('for', 'country');
        countryLabel.innerText = 'Country';

        const mark = renderSvg('field__mark', downMark);

        countryField.appendChild(countryInput);
        countryField.appendChild(countryLabel);
        countryField.appendChild(mark);
        countryField.appendChild(countryList);

        return countryField;
    }

    const page = document.createElement('div');
    page.id = 'login';

    const logo = document.createElement('img');
    logo.id = 'logo';
    logo.src = logoSvg;
    logo.alt = 'logo';

    const h1 = document.createElement('h1');
    h1.innerText = 'Sign in to Telegram';

    const h3 = document.createElement('h3');
    h3.id = 'description';
    h3.innerText = 'Please confirm your country and enter your phone number.';

    const form = document.createElement('form');
    form.onsubmit = function onSubmit(e) {
        e.preventDefault();
        navigate('/', { step: 1 });
    };

    const btn = document.createElement('button');
    btn.className = 'submit';
    btn.innerText = 'NEXT';
    prepareRipple(btn);

    const countryField = buildCountryField(btn);

    const phoneField = document.createElement('div');
    phoneField.className = 'field';

    const phoneInput = document.createElement('input');
    phoneInput.className = 'field__input';
    phoneInput.id = 'phone';
    phoneInput.type = 'tel';
    phoneInput.required = true;
    phoneInput.oninput = onInput;

    const phoneLabel = document.createElement('label');
    phoneLabel.setAttribute('for', 'phone');
    phoneLabel.innerText = 'Phone number';

    phoneField.appendChild(phoneInput);
    phoneField.appendChild(phoneLabel);

    const keepField = document.createElement('div');
    keepField.id = 'keep-field';

    const keepInput = document.createElement('input');
    keepInput.id = 'keep';
    keepInput.type = 'checkbox';

    const keepSpan = document.createElement('span');
    keepSpan.innerText = 'Keep me signed in';

    keepField.appendChild(keepInput);
    keepField.appendChild(keepSpan);

    page.appendChild(logo);
    page.appendChild(h1);
    page.appendChild(h3);

    form.appendChild(countryField);
    form.appendChild(phoneField);
    form.appendChild(keepField);
    form.appendChild(btn);
    page.appendChild(form);

    return page;
}
