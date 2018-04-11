module.exports = (render) => {
    return function (req, res, next) {
        if (!req.isAuthenticated || !req.isAuthenticated()) {
            render(req, res);

            return;
        }
        next();
    };
};
