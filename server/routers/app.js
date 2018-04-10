const renderSignIn = require('../middlewares/render-sign-in');
module.exports = (server, app) => {
    const render = pageName => (req, res) => app.render(req, res, `/${pageName}`);

    server
        .route('/')
        .get(renderSignIn(app), render('index'));

    server.all('*', (req, res) => res.sendStatus(404));
};
