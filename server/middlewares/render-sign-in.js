module.exports = (app) => {
    return function (req, res, next) {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            app.render(req, res, '/signin');

            return;
        }
        next();
    };
};
