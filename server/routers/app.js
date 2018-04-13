const hasNotSignedIn = require('../middlewares/has-not-signed-in');
module.exports = (server, app) => {
    const render = pageName => (req, res) => app.render(req, res, `/${pageName}`);

    server
        .route('/')
        .get(
            hasNotSignedIn(render('signin')),
            render('index')
        );
    server.get('*', app.getRequestHandler());

    server.all('*', (req, res) => res.sendStatus(404));
};
