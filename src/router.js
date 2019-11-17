import './index.scss';
import { clear } from './utils/clear';

var app = document.getElementById('app');

const pages = {
    '/': [
        function() {
            return import(/* webpackChunkName: "login" */ './pages/login');
        },
        function() {
            return import(/* webpackChunkName: "sms" */ './pages/sms');
        },
        function() {
            return import(
                /* webpackChunkName: "password" */ './pages/password'
            );
        },
        function() {
            return import(/* webpackChunkName: "tgweb" */ './pages/tgweb');
        },
    ],
};

function loadPage(page, state) {
    return pages[page][state.step]().then(function(content) {
        clear(app);
        return app.appendChild(content.render(state));
    });
}

export function navigate(page, state) {
    return loadPage(page, state).then(function() {
        history.pushState(state, '', '/');
        localStorage.setItem('lastState', JSON.stringify(state));
    });
}

navigate('/', JSON.parse(localStorage.getItem('lastState')) || { step: 0 });

window.onpopstate = function(event) {
    loadPage(document.location.pathname, event.state);
};
