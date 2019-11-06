var app = document.getElementById('app');

import('./login.html').then(function(login) {
    app.innerHTML = login;
});
