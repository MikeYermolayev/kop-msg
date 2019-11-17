import './chatBar.scss';
import menuSvg from '../../assets/icons/menu_svg.html';
import searchSvg from '../../assets/icons/search_svg.html';
import { renderSvg } from '../../utils/renderSvg';
import { prepareRipple } from '../../utils/ripple';
import { createElement } from '../../utils/createElement';
import { renderChatList } from './chatList';

const pinnedData = [
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: false,
        time: '19:23',
        muted: true,
        unreadCount: 0,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: true,
        time: '19:23',
        muted: false,
        unreadCount: 10,
        sent: true,
        delivered: true,
    },
];
const data = [
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: false,
        time: '19:23',
        muted: true,
        unreadCount: 20,
        sent: true,
        delivered: false,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: false,
        time: '19:23',
        muted: true,
        unreadCount: 0,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: true,
        time: '19:23',
        muted: true,
        unreadCount: 0,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: false,
        time: '19:23',
        muted: true,
        unreadCount: 5,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: true,
        time: '19:23',
        muted: false,
        unreadCount: 15,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: false,
        time: '19:23',
        muted: true,
        unreadCount: 0,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: true,
        time: '19:23',
        muted: true,
        unreadCount: 0,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: false,
        time: '19:23',
        muted: true,
        unreadCount: 2,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: true,
        time: '19:23',
        muted: true,
        unreadCount: 1,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: true,
        time: '19:23',
        muted: true,
        unreadCount: 1,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: true,
        time: '19:23',
        muted: true,
        unreadCount: 1,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: true,
        time: '19:23',
        muted: true,
        unreadCount: 0,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: true,
        time: '19:23',
        muted: true,
        unreadCount: 0,
        sent: true,
        delivered: true,
    },
    {
        name: 'John Doe',
        message: 'Feed meeew, please :3',
        avatar: 'https://cataas.com/cat?' + Math.random(),
        online: true,
        time: '19:23',
        muted: true,
        unreadCount: 0,
        sent: true,
        delivered: true,
    },
];

export function renderChatBar(onChatSelect) {
    const chatBar = createElement('div', 'chatBar');

    const header = createElement('div', 'chatBar__header');

    const menu = renderSvg(menuSvg);
    menu.id = 'chatBar__menuIcon';
    const menuWrapper = createElement('i', 'chatBar__menu');
    menuWrapper.appendChild(menu);

    prepareRipple(menuWrapper, true, true);

    const searchField = createElement('div', 'chatBar__searchField');

    const searchInput = createElement('input', 'chatBar__searchField_input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search';

    const searchIcon = renderSvg(searchSvg);
    searchIcon.id = 'chatBar__searchField_icon';

    searchField.appendChild(searchInput);
    searchField.appendChild(searchIcon);

    header.appendChild(menuWrapper);
    header.appendChild(searchField);

    chatBar.appendChild(header);

    const lists = createElement('div', 'chatBar__lists');

    const pinnedList = renderChatList(pinnedData, onChatSelect, true);
    pinnedList.id = 'chatBar__pinnedList';

    const list = renderChatList(data, onChatSelect);
    list.id = 'chatBar__list';

    lists.appendChild(pinnedList);
    lists.appendChild(list);

    chatBar.appendChild(lists);

    return chatBar;
}
