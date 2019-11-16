import monkeyIdle from '../assets/monkey/TwoFactorSetupMonkeyIdle.tgs';
import monkeyTracking from '../assets/monkey/TwoFactorSetupMonkeyTracking.tgs';
import './sms.scss';
import { fetchTgs } from '../utils/fetchTgs';
import editSvg from '../assets/icons/edit_svg.html';
import { renderSvg } from '../utils/renderSvg';
import { navigate } from '../router';
import { validate } from '../utils/validate';
import { loadAnimation } from '../utils/loadAnimation';

export function render(state) {
    const CODE_ERROR = 'Invalid code';
    const CODE_LABEL = 'Code';
    const IDLE_ANIM = 'idle';
    const TRACKING_ANIM = 'peek';

    function getCodeError(value) {
        return value.length > 4 ? null : CODE_ERROR;
    }

    const page = document.createElement('div');
    page.id = 'sms';

    const player = document.createElement('div');
    player.id = 'monkey';

    let animElement;
    function animate(name, promise) {
        loadAnimation(animElement, player, name, promise, true, true).then(
            function(el) {
                animElement = el;
            },
        );
    }

    const monkeyIdlePromise = fetchTgs(monkeyIdle);
    const monkeyTrackingPromise = fetchTgs(monkeyTracking);

    const h1 = document.createElement('h1');
    h1.id = 'sms-header';
    h1.innerText = state.phone;

    const editIcon = renderSvg(editSvg);
    editIcon.id = 'edit-icon';
    h1.appendChild(editIcon);
    h1.onmousedown = function() {
        navigate('/', {
            step: 0,
            phone: state.phone,
            country: state.country,
        });
    };

    const h4 = document.createElement('h4');
    h4.innerText = 'We have sent you an SMS with the code.';

    const smsCodeField = document.createElement('div');
    smsCodeField.id = 'smsCode-field';
    smsCodeField.className = 'field';

    const smsCodeInput = document.createElement('input');
    smsCodeInput.autocomplete = 'off';
    smsCodeInput.required = true;
    smsCodeInput.className = 'field__input';
    smsCodeInput.id = 'smsCode';
    smsCodeInput.type = 'text';
    smsCodeInput.oninput = function(event) {
        if (event.currentTarget.value.length > 0) {
            animate(TRACKING_ANIM, monkeyTrackingPromise);
            event.currentTarget.parentNode.classList.add('field__dirty');

            if (
                validate(smsCodeInput, smsCodeLabel, getCodeError, CODE_LABEL)
            ) {
                navigate('/', {
                    step: 2,
                    phone: state.phone,
                    country: state.country,
                });
            }
        } else {
            animate(IDLE_ANIM, monkeyIdlePromise);
            event.currentTarget.parentNode.classList.remove('field__dirty');
        }
    };
    smsCodeInput.onfocus = function() {
        if (smsCodeInput.value) {
            animate(TRACKING_ANIM, monkeyTrackingPromise);
        }
    };
    smsCodeInput.onblur = function() {
        animate(IDLE_ANIM, monkeyIdlePromise);
    };

    const smsCodeLabel = document.createElement('label');
    smsCodeLabel.id = 'smsCode-label';
    smsCodeLabel.setAttribute('for', 'smsCode');
    smsCodeLabel.innerText = CODE_LABEL;

    smsCodeField.appendChild(smsCodeInput);
    smsCodeField.appendChild(smsCodeLabel);

    page.appendChild(player);
    page.appendChild(h1);
    page.appendChild(h4);
    page.appendChild(smsCodeField);

    animate(IDLE_ANIM, monkeyIdlePromise);

    return page;
}
