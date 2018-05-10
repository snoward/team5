const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const config = require('config');

const init = require('./init');
const User = require('../../models/schemas/user');

const strategy = new GithubStrategy(
    {
        clientID: config.get('githubCliendId'),
        clientSecret: config.get('gitHubClientSecret'),
        callbackURL: `${config.get('baseUrl')}/auth/return`
    },
    async (accessToken, refreshToken, profile, done) => {
        // сохраняем пользователя в БД
        try {
            await User.findOneOrCreate(profile.username);
            done(null, profile);
        } catch (ex) {
            console.error(`Auth error for user: ${profile.username}. ${ex}`);
            done(null, false);
        }
    }
);

passport.use(strategy);

init();

module.exports = passport;
