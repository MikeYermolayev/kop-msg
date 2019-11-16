export function renderSvg(className, template) {
    const span = document.createElement('span');

    span.innerHTML = template;

    const svg = span.firstChild;

    svg.setAttribute('class', className);

    return svg;
}
