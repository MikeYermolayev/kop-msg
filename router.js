var app = document.getElementById('app');

import('./login.html').then(function(login) {
    app.innerHTML = login;
    var scripts = app.querySelectorAll('script');

    for (var j = 0; j < scripts.length; j++) {
        var script = document.createElement('script');
        script.type = scripts[j].type || 'text/javascript';
        if (scripts[j].hasAttribute('src')) script.src = scripts[j].src;
        script.innerHTML = scripts[j].innerHTML;
        document.head.appendChild(script);
        document.head.removeChild(script);
    }
});
