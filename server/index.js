const express = require('express');
const { Server } = require('http');
const expressSession = require('express-session');
const passport = require('passport');
const config = require('config');
const bodyParser = require('body-parser');

const authRouter = require('./routers/auth');
const apiRouter = require('./routers/api');
const appRouter = require('./routers/app');
const { configureIo } = require('./sockets/sockets');

const next = require('next');

const app = next({ dev: process.env.NODE_ENV !== 'production' });

const expressServer = express();

var httpServer = new Server(expressServer);

const io = require('socket.io')(httpServer);
configureIo(io);

app.prepare().then(() => {
    expressServer.use(bodyParser.json());

    expressServer.use(expressSession({
        secret: config.get('expressSessionSecret'),
        resave: false,
        saveUninitialized: false
    }));

    expressServer.use(passport.initialize());
    expressServer.use(passport.session());

    authRouter(expressServer);
    apiRouter(expressServer);
    appRouter(expressServer, app);

    httpServer.listen(3000, () => console.info('localhost:3000'));
});

