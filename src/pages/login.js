import config from '../config';
import './login.scss';
import logoSvg from '../assets/logo.svg';
import downMark from '../assets/icons/down_svg.html';
import { renderSvg } from '../utils/renderSvg';
import { navigate } from '../router';
import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile';
import { validate } from '../utils/validate';
import { createElement } from '../utils/createElement';
import { renderSubmit } from '../components/submit';
import { mtclient } from '../utils/mtclient';

export function render(state) {
    const COUNTRY_LABEL = 'Country';
    const PHONE_LABEL = 'Phone number';
    const PHONE_ERROR = 'Invalid phone number';
    const SPACE_REG = /\s/g;

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

    const page = createElement('div', 'login');

    const logo = createElement('img', 'logo');
    logo.src = logoSvg;
    logo.alt = 'logo';

    const h1 = document.createElement('h1');
    h1.innerText = 'Sign in to Telegram';

    const h4 = createElement('h4', 'description');
    h4.innerText = 'Please confirm your country and enter your phone number.';

    const form = document.createElement('form');
    form.onsubmit = function(e) {
        e.preventDefault();

        if (validate(phoneInput, phoneLabel, getPhoneError, PHONE_LABEL)) {
            btn.setSubmit();

            mtclient()
                .then(function() {
                    navigate('/', {
                        step: 1,
                        phone: phoneInput.value,
                        country: countryInput.value,
                    });
                    btn.resetSubmit();
                })
                .catch(function(err) {
                    btn.resetSubmit();
                });
        }
    };

    const btn = renderSubmit();
    if (state.country && state.phone) {
        btn.classList.add('submit__visible');
    }

    const countryField = createElement('div', 'country-field', 'field');

    const countryInput = createElement('input', 'country', 'field__input');
    countryInput.autocomplete = 'off';
    countryInput.required = true;
    countryInput.type = 'text';
    countryInput.oninput = function(event) {
        onInput(event);
    };
    countryInput.onblur = function() {
        if (!countryInput.value) {
            countryLabel.innerText = COUNTRY_LABEL;
        }
    };

    const countryLabel = createElement('label', 'country-label');
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

    const countryList = createElement('ul', 'country-list', 'field__dropdown');

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

        const flag = createElement('span', null, 'flag');
        flag.innerText = country.emoji;

        const countryName = createElement('span', null, 'country-name');
        countryName.innerText = country.name;

        const codeValue = country.dialCode;

        const code = createElement('span', null, 'code');
        code.innerText = codeValue;

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

    const phoneField = createElement('div', null, 'field');

    const phoneInput = createElement('input', 'phone', 'field__input');
    phoneInput.type = 'tel';
    phoneInput.required = true;
    phoneInput.oninput = function(event) {
        if (phoneInput.value.length >= 2) {
            const country = config.countries.find(function(c) {
                return (
                    phoneInput.value
                        .replace(SPACE_REG, '')
                        .indexOf(c.dialCode.replace(SPACE_REG, '')) > -1
                );
            });

            if (country) {
                countryInput.value = country.name;
                countryField.classList.add('field__dirty');
            }
        } else if (phoneInput.value === 0) {
            countryInput.value = '';
            countryField.classList.remove('field__dirty');
        }

        onInput(event);
    };
    phoneInput.onblur = function(ev) {
        if (validate(phoneInput, phoneLabel, getPhoneError, PHONE_LABEL)) {
            const number = parsePhoneNumberFromString(phoneInput.value);

            phoneInput.value = number ? number.formatInternational() : '';
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

    const keepField = createElement('div', 'keep-field');

    const keepInput = createElement('input', 'keep');
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
