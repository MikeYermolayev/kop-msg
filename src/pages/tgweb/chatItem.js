import './chatItem.scss';
import { createElement } from '../../utils/createElement';
import { prepareRipple } from '../../utils/ripple';
import { renderSvg } from '../../utils/renderSvg';
import check from '../../assets/icons/1check_svg.html';
import pinnedchat from '../../assets/icons/pinnedchat_svg.html';
import doubleCheck from '../../assets/icons/2checks_svg.html';

export function renderChatItem(data, onChatSelect, isPinned) {
    const chatItem = createElement('div', null, 'chatItem');

    prepareRipple(chatItem, false, true);

    const avatar = createElement('div', null, 'chatItem__avatar-wrapper');
    const avatarImg = createElement('img', null, 'chatItem__avatar');
    avatarImg.src = data.avatar;
    avatarImg.alt = 'avatar';
    if (data.online) {
        avatar.classList.add('online');
    }

    avatar.appendChild(avatarImg);

    chatItem.appendChild(avatar);

    const content = createElement('div', null, 'chatItem__content');

    const upper = createElement('div', null, 'chatItem__upper');
    const name = createElement('div', null, 'chatItem__name');
    name.innerText = data.name;
    upper.appendChild(name);

    let icon;
    if (data.delivered) {
        icon = doubleCheck;
    } else if (data.sent) {
        icon = check;
    }
    if (icon) {
        const iconNode = renderSvg(icon, 'chatItem__status');
        upper.appendChild(iconNode);
    }

    const time = createElement('div', null, 'chatItem__time');
    time.innerText = data.time;

    upper.appendChild(time);

    const message = createElement('div', null, 'chatItem__message');
    message.innerText = data.message;

    content.appendChild(upper);
    content.appendChild(message);

    let badge;
    if (data.unreadCount) {
        badge = createElement('div', null, 'chatItem__badge counter');
        if (!data.muted) {
            badge.classList.add('green-bg');
        }
        badge.innerText = data.unreadCount;
    } else if (isPinned) {
        badge = renderSvg(pinnedchat, 'chatItem__badge');
    }

    if (badge) {
        content.appendChild(badge);
    }

    chatItem.appendChild(content);

    chatItem.onmousedown = function() {
        onChatSelect(data);
    };

    return chatItem;
}
