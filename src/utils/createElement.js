export function createElement(tag, id, className) {
    const element = document.createElement(tag);
    if (id) {
        element.id = id;
    }
    if (className) {
        element.className = className;
    }

    return element;
}
