import './chat.scss';
import { createElement } from '../../utils/createElement';
import { renderBubbles } from './bubbles';

export function renderChat(data) {
    const chat = createElement('div', 'chat');

    const header = createElement('div', 'chat__header');

    const chatItem = createElement('div', null, 'chatItem');

    const avatar = createElement('img', null, 'chatItem__avatar');
    avatar.src = data.avatar;
    avatar.alt = 'avatar';

    chatItem.appendChild(avatar);

    const content = createElement('div', null, 'chatItem__content');

    const upper = createElement('div', null, 'chatItem__upper');
    const name = createElement('div', null, 'chatItem__name');
    name.innerText = data.name;
    upper.appendChild(name);

    content.appendChild(upper);

    if (data.online) {
        const message = createElement('div', null, 'chatItem__onlineMsg');
        message.innerText = 'online';

        content.appendChild(message);
    }

    chatItem.appendChild(content);

    header.appendChild(chatItem);

    const bubbles = renderBubbles();

    chat.appendChild(header);
    chat.appendChild(bubbles);

    return chat;
}
