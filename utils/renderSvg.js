export function renderSvg(className, template) {
    const span = document.createElement('span');

    span.innerHTML = template;
    span.firstChild.classList.add(className);

    return span.firstChild;
}
