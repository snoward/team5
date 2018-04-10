const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const config = require('config');

const db = require('../dbHelper');
const init = require('./init');

const strategy = new GithubStrategy(
    {
        clientID: config.get('githubCliendId'),
        clientSecret: config.get('gitHubClientSecret'),
        callbackURL: `${config.get('baseUrl')}/auth/return`
    },
    async (accessToken, refreshToken, profile, done) => {

        // сохраняем пользователя в БД
        try {
            await db.put(`users_${profile.username}`, JSON.stringify(profile));
            done(null, profile);
        } catch (ex) {
            done(null, false);
        }
    }
);

passport.use(strategy);

init();

module.exports = passport;
