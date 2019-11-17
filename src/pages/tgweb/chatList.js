import './chatList.scss';
import { createElement } from '../../utils/createElement';
import { renderChatItem } from './chatItem';

export function renderChatList(data, onChatSelect, isPinned) {
    const chatList = createElement('div', null, 'chatList');

    const fragment = document.createDocumentFragment();

    data.forEach(function(item) {
        fragment.appendChild(renderChatItem(item, onChatSelect, isPinned));
    });

    chatList.appendChild(fragment);

    return chatList;
}
