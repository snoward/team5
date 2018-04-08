const express = require('express');
const expressSession = require('express-session');
const passport = require('passport');
const config = require('config');
const bodyParser = require('body-parser');

const authRouter = require('./routers/auth');
const apiRouter = require('./routers/api');
const appRouter = require('./routers/app');

const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

const next = require('next');

const app = next({ dev: process.env.NODE_ENV !== 'production' });

const server = express();

app.prepare().then(() => {
    server.use(bodyParser.json());

    server.use(expressSession({
        secret: config.get('expressSessionSecret'),
        resave: false,
        saveUninitialized: false
    }));

    server.use(passport.initialize());
    server.use(passport.session());

    authRouter(server);

    server.use(ensureLoggedIn('/auth'));

    apiRouter(server);
    appRouter(server, app);

    server.listen(3000, () => console.info('localhost:3000'));
});

