import lottie from 'lottie-web';
import monkeyIdle from '../assets/monkey/TwoFactorSetupMonkeyIdle.tgs';
import monkeyTracking from '../assets/monkey/TwoFactorSetupMonkeyTracking.tgs';
import './sms.scss';
import { fetchTgs } from '../utils/fetchTgs';
import editSvg from '../assets/icons/edit_svg.html';
import { renderSvg } from '../utils/renderSvg';
import { navigate } from '../router';

export function render(state) {
    const page = document.createElement('div');
    page.id = 'sms';

    const player = document.createElement('div');
    player.id = 'monkey';

    let animElement;

    function loadAnimation(name, promise) {
        if (animElement && animElement.name === name) {
            return;
        }

        promise.then(function(animationData) {
            animElement && animElement.destroy();

            animElement = lottie.loadAnimation({
                container: player,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                name,
                animationData,
            });
        });
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
            loadAnimation('tracking', monkeyTrackingPromise);
            event.currentTarget.parentNode.classList.add('field__dirty');
        } else {
            loadAnimation('idle', monkeyIdlePromise);
            event.currentTarget.parentNode.classList.remove('field__dirty');
        }
    };
    smsCodeInput.onfocus = function() {
        if (smsCodeInput.value) {
            loadAnimation('tracking', monkeyTrackingPromise);
        }
    };
    smsCodeInput.onblur = function() {
        loadAnimation('idle', monkeyIdlePromise);
    };

    const smsCodeLabel = document.createElement('label');
    smsCodeLabel.id = 'smsCode-label';
    smsCodeLabel.setAttribute('for', 'smsCode');
    smsCodeLabel.innerText = 'Code';

    smsCodeField.appendChild(smsCodeInput);
    smsCodeField.appendChild(smsCodeLabel);

    page.appendChild(player);
    page.appendChild(h1);
    page.appendChild(h4);
    page.appendChild(smsCodeField);

    loadAnimation('idle', monkeyIdlePromise);

    return Promise.resolve(page);
}
