import { clear } from './clear';

const popupContainer = document.getElementById('popup');

popupContainer.addEventListener('click', function onClick(event) {
    if (event.target === popupContainer) {
        hidePopup();
    }
});

export function openPopup(node, popup) {
    const rect = node.getBoundingClientRect();

    popupContainer.style.display = 'block';

    popup.style.position = 'absolute';
    popup.style.left = rect.left + 'px';
    popup.style.top = rect.bottom + 'px';

    popupContainer.appendChild(popup);
}

export function hidePopup() {
    clear(popupContainer);
    popupContainer.style.display = 'none';
}
