import './chatItem.scss';
import { createElement } from '../../utils/createElement';
import { prepareRipple } from '../../utils/ripple';

export function renderChatItem(onChatSelect) {
    const chatItem = createElement('div', null, 'chatItem');

    prepareRipple(chatItem, false, true);

    const avatar = createElement('div', null, 'chatItem__avatar');

    chatItem.appendChild(avatar);

    chatItem.onmousedown = onChatSelect;

    return chatItem;
}
