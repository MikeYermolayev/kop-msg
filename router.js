import { clear } from './utils/clear';

var app = document.getElementById('app');

const pages = {
    '/': [import('./pages/login'), import('./pages/sms')],
};

function loadPage(page, state) {
    return pages[page][state.step].then(function onRoute(content) {
        clear(app);

        app.appendChild(content.render());
    });
}

export function navigate(page, state) {
    return loadPage(page, state).then(function onLoad() {
        history.pushState(state, '', '/');
    });
}

navigate('/', { step: 0 });

window.onpopstate = function(event) {
    loadPage(document.location.pathname, event.state);
};
