const db = require('../libs/dbHelper');
const uuid = require('uuid/v4');

module.exports.conversations = async (req, res) => {
    const conversations = await db.getAll(`conversations_${req.user.id}`);
    res.json(conversations);
};

module.exports.create = async (req, res) => {
    const conversation = {
        id: uuid(),
        title: req.params.title,
        users: [req.user.id]
    };

    try {
        await db.post(`conversations_${req.user.id}`, JSON.stringify(conversation));
    } catch (ex) {
        console.error(`Can't create conversation. Exception: ${ex}`);
        res.sendStatus(500);
    }
    res.sendStatus(201);
};
