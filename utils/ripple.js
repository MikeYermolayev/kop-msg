export function prepareRipple(el, rps, light) {
    el.classList.add('rp');
    if (rps) {
        el.classList.add('rps');
    }

    el.addEventListener('mousedown', function onMouseDown(e) {
        let rect = el.getBoundingClientRect();

        let X = e.clientX - rect.left;
        let Y = e.clientY - rect.top;
        let rippleDiv = document.createElement('div');
        rippleDiv.classList.add('ripple');
        if (light) {
            rippleDiv.classList.add('rp-light');
        }
        rippleDiv.setAttribute('style', 'top:' + Y + 'px; left:' + X + 'px;');
        el.appendChild(rippleDiv);
        setTimeout(
            function() {
                rippleDiv.parentNode.removeChild(rippleDiv);
            },
            rps ? 400 : 700,
        );
    });
}
