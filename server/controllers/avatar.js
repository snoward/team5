const icon = require('../libs/indenticon/indenticon');
const contentTypeSvg = 'image/svg+xml';

module.exports = async (req, res) => {
    if (req.params.id) {
        res.set('Content-Type', contentTypeSvg);
        res.send(icon.svg(req.params.id));

        return;
    }

    if (!req.user) {
        res.sendStatus(401);

        return;
    }
    res.set('Content-Type', contentTypeSvg);
    res.send(icon.svg(req.user.id));
};
