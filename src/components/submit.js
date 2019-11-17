import { createElement } from '../utils/createElement';
import { prepareRipple } from '../utils/ripple';

export function renderSubmit() {
    const btn = createElement('button', null, 'submit');
    btn.innerText = 'NEXT';
    prepareRipple(btn);

    btn.showSubmit = function() {
        btn.classList.add('submit__visible');
    };
    btn.hideSubmit = function() {
        btn.classList.remove('submit__visible');
    };

    btn.setSubmit = function() {
        btn.classList.add('submit__loading');
        btn.firstChild.nodeValue = 'PLEASE WAIT...';
        // btn.disabled = true;
    };

    btn.resetSubmit = function() {
        btn.classList.remove('submit__loading');
        btn.firstChild.nodeValue = 'NEXT';
        // btn.disabled = false;
    };

    return btn;
}
