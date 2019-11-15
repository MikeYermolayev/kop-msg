export function prepareRipple(el) {
    el.classList.add('rp');
    el.addEventListener('mousedown', function onMouseDown(e) {
        let rect = el.getBoundingClientRect();

        let X = e.clientX - rect.left;
        let Y = e.clientY - rect.top;
        let rippleDiv = document.createElement('div');
        rippleDiv.classList.add('ripple');
        rippleDiv.setAttribute('style', 'top:' + Y + 'px; left:' + X + 'px;');
        el.appendChild(rippleDiv);
        setTimeout(function() {
            rippleDiv.parentElement.removeChild(rippleDiv);
        }, 700);
    });
}
