export function renderSvg(template, className) {
    const span = document.createElement('span');

    span.innerHTML = template;

    const svg = span.firstChild;

    if (className) {
        svg.setAttribute('class', className);
    }

    return svg;
}
