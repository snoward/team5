const githubPassport = require('../libs/auth/github');

module.exports = app => {

    app
        .get('/auth', githubPassport.authenticate('github'))
        .get(
            '/auth/return',
            githubPassport.authenticate('github', { failureRedirect: '/auth' }),
            (req, res) => res.redirect('/')
        )
        .get('/auth/logout', (req, res) => {
            req.logOut();
            res.redirect('/');
        });
};
