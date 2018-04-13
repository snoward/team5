const uuid = require('uuid/v4');

const db = require('../libs/dbHelper');

module.exports.conversations = async (req, res) => {
    const conversationsIds = await db.getAll(`conversations_${req.user.username}`);

    const conversations = [];
    for (const id of conversationsIds) {
        const conversation = await db.get(`conversations_${id}`);
        conversations.push(conversation);
    }
    res.json(conversations);
};

module.exports.getInfo = async (req, res) => {
    const conversation = await db.get(`conversations_${req.params.conversationId}`);
    res.json(conversation);
};

module.exports.create = async (req, res) => {
    const conversation = {
        id: uuid(),
        title: req.params.title,
        users: [req.user.username]
    };

    try {
        await db.post(`conversations_${conversation.id}`, JSON.stringify(conversation));
        await db.post(`conversations_${req.user.username}`, conversation.id);
    } catch (ex) {
        console.error(`Can't create conversation. Exception: ${ex}`);

        return res.sendStatus(500);
    }

    res.status(201).send(conversation);
};

module.exports.addUser = async (req, res) => {
    const conversationId = req.params.conversationId;
    const { username } = req.body;

    try {
        await db.get(`users_${username}`);
    } catch (ex) {
        return res.status(404).send(`User ${username} not found`);
    }

    const conversation = await db.get(`conversations_${conversationId}`);
    if (conversation.users.includes(username)) {
        return res.status(400).send(`User ${username} already in conversation`);
    }

    conversation.users.push(username);
    try {
        await db.put(`conversations_${conversationId}`, JSON.stringify(conversation));
        await db.post(`conversations_${username}`, conversation.id);
    } catch (ex) {
        console.error(`Can't update conversation. Exception: ${ex}`);

        return res.sendStatus(500);
    }

    res.status(201).send(conversation);
};
