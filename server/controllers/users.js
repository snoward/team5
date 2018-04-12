const db = require('../libs/dbHelper');

module.exports.user = async (req, res) => {
    const username = req.params.username;
    try {
        const user = await db.get(`users_${username}`);
        res.status(200).send(user);
    } catch (ex) {
        res.status(404).send(`User ${username} not found`);
    }
};
