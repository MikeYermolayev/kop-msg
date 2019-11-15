import { clear } from './utils/clear';

var app = document.getElementById('app');

const routes = {
    '/': import('./pages/login'),
};

routes['/'].then(function onRoute(page) {
    clear(app);

    app.appendChild(page.render());
});
