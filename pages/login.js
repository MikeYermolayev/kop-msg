import config from '../config';
import './login.scss';
import logoSvg from '../assets/logo.svg';
import downMark from '../assets/icons/down_svg.html';
import { renderSvg } from '../utils/renderSvg';
import { prepareRipple } from '../utils/ripple';
import { navigate } from '../router';
import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile';
import { validate } from '../utils/validate';

export function render(state) {
    const COUNTRY_LABEL = 'Country';
    const PHONE_LABEL = 'Phone number';
    const PHONE_ERROR = 'Invalid phone number';

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

    function getPhoneError(value) {
        if (!value) {
            return;
        }
        try {
            const phoneNumber = parsePhoneNumberFromString(value);

            if (!phoneNumber || !phoneNumber.isValid()) {
                return PHONE_ERROR;
            }
        } catch (err) {
            return err.message;
        }
    }

    function selectCountry(name, phone) {
        countryInput.value = name;
        countryField.classList.add('field__dirty');

        phoneInput.value = phone;
        phoneField.classList.add('field__dirty');

        setTimeout(function() {
            phoneInput.focus();
        }, 0);
    }

    const page = document.createElement('div');
    page.id = 'login';

    const logo = document.createElement('img');
    logo.id = 'logo';
    logo.src = logoSvg;
    logo.alt = 'logo';

    const h1 = document.createElement('h1');
    h1.innerText = 'Sign in to Telegram';

    const h4 = document.createElement('h4');
    h4.id = 'description';
    h4.innerText = 'Please confirm your country and enter your phone number.';

    const form = document.createElement('form');
    form.onsubmit = function(e) {
        e.preventDefault();
        if (validate(phoneInput, phoneLabel, getPhoneError, PHONE_LABEL)) {
            navigate('/', {
                step: 1,
                phone: phoneInput.value,
                country: countryInput.value,
            });
        }
    };

    const btn = document.createElement('button');
    btn.className = 'submit';
    btn.innerText = 'NEXT';
    prepareRipple(btn);

    const countryField = document.createElement('div');
    countryField.id = 'country-field';
    countryField.className = 'field';

    const countryInput = document.createElement('input');
    countryInput.autocomplete = 'off';
    countryInput.required = true;
    countryInput.className = 'field__input';
    countryInput.id = 'country';
    countryInput.type = 'text';
    countryInput.oninput = onInput;
    countryInput.onblur = function() {
        if (!countryInput.value) {
            countryLabel.innerText = COUNTRY_LABEL;
        }
    };

    const countryLabel = document.createElement('label');
    countryLabel.id = 'country-label';
    countryLabel.setAttribute('for', 'country');
    countryLabel.innerText = COUNTRY_LABEL;

    const mark = renderSvg(downMark, 'field__icon field__icon_rotate');
    mark.onmousedown = function() {
        if (document.activeElement !== countryInput) {
            setTimeout(function() {
                countryInput.focus();
            }, 0);
        }
    };

    const countryList = document.createElement('ul');
    countryList.id = 'country-list';
    countryList.className = 'field__dropdown';

    countryList.onmouseover = function(event) {
        countryLabel.innerText = event.target.getAttribute('data-name');
    };

    countryList.onmousedown = function(event) {
        selectCountry(
            event.target.getAttribute('data-name'),
            event.target.getAttribute('data-code'),
        );
    };

    countryList.onmouseleave = function() {
        countryLabel.innerText = COUNTRY_LABEL;
    };

    const fragment = document.createDocumentFragment();

    config.countries.forEach(function(country) {
        const li = document.createElement('li');

        const flag = document.createElement('span');
        flag.innerText = country.emoji;
        flag.className = 'flag';

        const countryName = document.createElement('span');
        countryName.innerText = country.name;
        countryName.className = 'country-name';

        const codeValue = country.dialCode;

        const code = document.createElement('span');
        code.innerText = codeValue;
        code.className = 'code';

        li.appendChild(flag);
        li.appendChild(countryName);
        li.appendChild(code);
        li.setAttribute('data-name', country.name);
        li.setAttribute('data-code', codeValue);

        fragment.appendChild(li);
    });

    countryList.appendChild(fragment);

    countryField.appendChild(countryInput);
    countryField.appendChild(countryLabel);
    countryField.appendChild(mark);
    countryField.appendChild(countryList);

    const phoneField = document.createElement('div');
    phoneField.className = 'field';

    const phoneInput = document.createElement('input');
    phoneInput.className = 'field__input';
    phoneInput.id = 'phone';
    phoneInput.type = 'tel';
    phoneInput.required = true;
    phoneInput.oninput = onInput;
    phoneInput.onblur = function(ev) {
        if (validate(phoneInput, phoneLabel, getPhoneError, PHONE_LABEL)) {
            const number = parsePhoneNumberFromString(phoneInput.value);

            phoneInput.value = number.formatInternational();
        }
    };

    if (state.phone) {
        phoneInput.value = state.phone;
    }

    const phoneLabel = document.createElement('label');
    phoneLabel.setAttribute('for', 'phone');
    phoneLabel.innerText = PHONE_LABEL;

    phoneField.appendChild(phoneInput);
    phoneField.appendChild(phoneLabel);

    const keepField = document.createElement('div');
    keepField.id = 'keep-field';

    const keepInput = document.createElement('input');
    keepInput.id = 'keep';
    keepInput.type = 'checkbox';

    const keepSpan = document.createElement('span');
    keepSpan.innerText = 'Keep me signed in';

    if (state.country && state.phone) {
        selectCountry(state.country, state.phone);
    }

    keepField.appendChild(keepInput);
    keepField.appendChild(keepSpan);

    page.appendChild(logo);
    page.appendChild(h1);
    page.appendChild(h4);

    form.appendChild(countryField);
    form.appendChild(phoneField);
    form.appendChild(keepField);
    form.appendChild(btn);
    page.appendChild(form);

    return page;
}
