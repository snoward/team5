const ErrorInfo = require('../models/errorInfo');
const User = require('../models/schemas/user');

module.exports.user = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({ username });
        res.status(200).json(user);
    } catch (ex) {
        res.status(404).json({
            error: new ErrorInfo(404, `Пользователь ${username} не существует`)
        });
    }
};
