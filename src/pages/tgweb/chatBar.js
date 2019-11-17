import './chatBar.scss';
import menuSvg from '../../assets/icons/menu_svg.html';
import searchSvg from '../../assets/icons/search_svg.html';
import { renderSvg } from '../../utils/renderSvg';
import { prepareRipple } from '../../utils/ripple';
import { createElement } from '../../utils/createElement';
import { renderChatList } from './chatList';

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

    const pinnedList = renderChatList(onChatSelect);
    pinnedList.id = 'chatBar__pinnedList';

    const list = renderChatList(onChatSelect);
    list.id = 'chatBar__list';

    chatBar.appendChild(pinnedList);
    chatBar.appendChild(list);

    return chatBar;
}
