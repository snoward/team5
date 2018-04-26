const db = require('../libs/dbHelper');
const ErrorInfo = require('../models/errorInfo');

module.exports.user = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await db.get(`users_${username}`);
        res.status(200).json(user);
    } catch (ex) {
        res.status(404).json({
            error: new ErrorInfo(404, `User ${username} not found`)
        });
    }
};
