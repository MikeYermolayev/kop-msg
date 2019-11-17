import './emptyChat.scss';
import chatsPlaceholder from '../../assets/icons/chatsplaceholder_svg.html';
import { renderSvg } from '../../utils/renderSvg';
import { createElement } from '../../utils/createElement';

export function renderEmptyChat() {
    const emptyChat = document.createElement('div');
    emptyChat.id = 'emptyChat';

    const placeholder = renderSvg(chatsPlaceholder);
    placeholder.id = 'emptyChat__placeholder';

    const h2 = createElement('h2', 'emptyChat__msg');
    h2.innerHTML = 'Open Chat<br>or create a new one';

    emptyChat.appendChild(placeholder);
    emptyChat.appendChild(h2);

    return emptyChat;
}
