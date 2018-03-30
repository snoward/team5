const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const config = require('config');

const init = require('./init');

const strategy = new GithubStrategy(
    {
        clientID: config.get('githubCliendId'),
        clientSecret: config.get('gitHubClientSecret'),
        callbackURL: `${config.get('baseUrl')}/auth/return`
    },
    (accessToken, refreshToken, profile, done) => {
        done(null, profile);
    }
);

passport.use(strategy);

init();

module.exports = passport;
