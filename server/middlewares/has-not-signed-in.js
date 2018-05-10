module.exports = (handler) => {
    return function (req, res, next) {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            handler(req, res);

            return;
        }
        next();
    };
};
