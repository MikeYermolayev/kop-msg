import monkeyClose from '../assets/monkey/TwoFactorSetupMonkeyClose.tgs';
import monkeyPeek from '../assets/monkey/TwoFactorSetupMonkeyPeek.tgs';
import './password.scss';
import { fetchTgs } from '../utils/fetchTgs';
import eyeOpen from '../assets/icons/eye1_svg.html';
import eyeClose from '../assets/icons/eye2_svg.html';
import { renderSvg } from '../utils/renderSvg';
import { navigate } from '../router';
import { validate } from '../utils/validate';
import { loadAnimation } from '../utils/loadAnimation';
import { prepareRipple } from '../utils/ripple';

export function render(state) {
    const PASSWORD_ERROR = 'Invalid password';
    const PASSWORD_LABEL = 'Password';
    const CLOSE_ANIM = 'close';
    const PEEK_ANIM = 'peek';

    function getPasswordError(value) {
        return value.length > 4 ? null : PASSWORD_ERROR;
    }

    const page = document.createElement('div');
    page.id = 'password-page';

    const player = document.createElement('div');
    player.id = 'monkey';

    let animElement;
    function animate(name, promise) {
        loadAnimation(animElement, player, name, promise, false, false).then(
            function(el) {
                if (el === animElement) {
                    animElement.setDirection(animElement.playDirection * -1);
                    animElement.play();
                } else {
                    animElement = el;
                    const frames = animElement.getDuration(true);
                    animElement.playSegments([0, Math.ceil(frames / 2)], true);
                }
            },
        );
    }

    const monkeyClosePromise = fetchTgs(monkeyClose);
    const monkeyPeekPromise = fetchTgs(monkeyPeek);

    const h1 = document.createElement('h1');
    h1.innerText = 'Enter password';

    const h4 = document.createElement('h4');
    h4.innerText = 'Your account is protected with an additional password.';

    const form = document.createElement('form');
    form.onsubmit = function(e) {
        e.preventDefault();

        if (
            validate(
                passwordInput,
                passwordLabel,
                getPasswordError,
                PASSWORD_LABEL,
            )
        ) {
            navigate('/', {
                step: 3,
                phone: state.phone,
                country: state.country,
            });
        }
    };

    const passwordField = document.createElement('div');
    passwordField.id = 'password-field';
    passwordField.className = 'field';

    const passwordInput = document.createElement('input');
    passwordInput.required = true;
    passwordInput.className = 'field__input';
    passwordInput.id = 'password';
    passwordInput.type = 'password';
    passwordInput.oninput = function(event) {
        if (event.currentTarget.value.length > 0) {
            event.currentTarget.parentNode.classList.add('field__dirty');

            btn.classList.add('submit__visible');
        } else {
            animate(CLOSE_ANIM, monkeyClosePromise);
            event.currentTarget.parentNode.classList.remove('field__dirty');
            btn.classList.remove('submit__visible');
        }
    };

    const passwordLabel = document.createElement('label');
    passwordLabel.id = 'password-label';
    passwordLabel.setAttribute('for', 'password');
    passwordLabel.innerText = PASSWORD_LABEL;

    const icon = document.createElement('i');
    icon.className = 'field__icon';

    const eyeOpenIcon = renderSvg(eyeOpen);
    const eyeCloseIcon = renderSvg(eyeClose);

    let activeIcon = eyeOpenIcon;
    icon.appendChild(activeIcon);

    icon.onmousedown = function() {
        animate(PEEK_ANIM, monkeyPeekPromise);

        const newIcon = activeIcon === eyeOpenIcon ? eyeCloseIcon : eyeOpenIcon;

        icon.replaceChild(newIcon, activeIcon);
        activeIcon = newIcon;

        passwordInput.type =
            passwordInput.type === 'password' ? 'text' : 'password';

        if (document.activeElement !== passwordInput) {
            setTimeout(function() {
                passwordInput.focus();
            }, 0);
        }
    };

    passwordField.appendChild(icon);
    passwordField.appendChild(passwordInput);
    passwordField.appendChild(passwordLabel);

    const btn = document.createElement('button');
    btn.className = 'submit';
    btn.innerText = 'NEXT';
    prepareRipple(btn);

    page.appendChild(player);
    page.appendChild(h1);
    page.appendChild(h4);

    form.appendChild(passwordField);
    form.appendChild(btn);
    page.appendChild(form);

    animate('close', monkeyClosePromise);

    return page;
}
