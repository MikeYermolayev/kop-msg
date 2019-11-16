import './tgweb.scss';
import { renderChatBar } from './tgweb/chatBar';
import { renderEmptyChat } from './tgweb/emptyChat';
import { renderChat } from './tgweb/chat';

export function render() {
    let activeChat;
    const tgweb = document.createElement('div');
    tgweb.id = 'tgweb';

    const chatBar = renderChatBar(function() {
        const newChat = renderChat();
        newChat.classList.add('chat');
        tgweb.replaceChild(newChat, activeChat);
        activeChat = newChat;
    });
    chatBar.classList.add('left-sidebar');
    const emptyChat = renderEmptyChat();
    emptyChat.classList.add('chat');

    activeChat = emptyChat;

    tgweb.appendChild(chatBar);
    tgweb.appendChild(emptyChat);

    return tgweb;
}
