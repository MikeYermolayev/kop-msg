import './chatList.scss';
import { createElement } from '../../utils/createElement';
import { renderChatItem } from './chatItem';

export function renderChatList(onChatSelect) {
    const chatList = createElement('div', null, 'chatList');

    const item1 = renderChatItem(onChatSelect);
    const item2 = renderChatItem(onChatSelect);

    chatList.appendChild(item1);
    chatList.appendChild(item2);

    return chatList;
}
