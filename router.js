import { clear } from './utils/clear';

var app = document.getElementById('app');

const pages = {
    '/': [import('./pages/login'), import('./pages/sms')],
};

function loadPage(page, state) {
    return pages[page][state.step].then(function(content) {
        clear(app);

        return content.render(state).then(function(rendered) {
            app.appendChild(rendered);
        });
    });
}

export function navigate(page, state) {
    return loadPage(page, state).then(function() {
        history.pushState(state, '', '/');
    });
}

navigate('/', { step: 0, phone: '+375298231302' });

window.onpopstate = function(event) {
    loadPage(document.location.pathname, event.state);
};
