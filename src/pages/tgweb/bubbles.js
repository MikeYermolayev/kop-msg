import './bubbles.scss';
import { createElement } from '../../utils/createElement';

const data = [
    { message: "So how's your telegram contest?", direction: 'received' },
    { message: 'Argh... I wish I had more time.', direction: 'sent' },
    { message: "Haven't succeed implementing MTProto", direction: 'sent' },
    { message: "So I just did some mark up and that's all", direction: 'sent' },
    { message: 'Ah, I see.', direction: 'received' },
    {
        message:
            'Yeah, I really hope that everyone who submitted the task will be allowed to participate in next tour.',
        direction: 'sent',
    },
    { message: 'Crossing my fingers)', direction: 'sent' },
    { message: 'Well, good luck)', direction: 'received' },
];

export function renderBubbles() {
    const bubbles = createElement('div', 'bubbles');

    const fragment = document.createDocumentFragment();

    data.forEach(function(item) {
        const message = createElement('div', null, item.direction);

        const bubble = createElement('div', null, 'bubble');

        const text = createElement('div', null, 'bubble__text');
        text.innerText = item.message;
        bubble.appendChild(text);

        message.appendChild(bubble);

        fragment.appendChild(message);
    });

    bubbles.appendChild(fragment);

    return bubbles;
}
