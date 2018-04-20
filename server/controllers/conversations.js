const uuid = require('uuid/v4');

const db = require('../libs/dbHelper');

module.exports.conversations = async (req, res) => {
    const conversations = await getAllConversations(req.user.username);
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
        users: req.body.users,
        isPrivate: req.body.isPrivate
    };

    if (! await areUsersExist(conversation.users)) {
        return res.status(400).send('Incorrect users');
    }

    if (conversation.isPrivate && await isSuchPrivateAlreadyExist(conversation)) {
        return res.status(400).send('Such private conversation already exist');
    }

    try {
        await Promise.all([
            db.post(`conversations_${conversation.id}`, JSON.stringify(conversation)),
            addConversationToUsers(conversation)
        ]);
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
        await Promise.all([
            db.put(`conversations_${conversationId}`, JSON.stringify(conversation)),
            db.post(`conversations_${username}`, conversation.id)
        ]);
    } catch (ex) {
        console.error(`Can't update conversation. Exception: ${ex}`);

        return res.sendStatus(500);
    }

    res.status(201).send(conversation);
};

async function getAllConversations(username) {
    const conversationsIds = await db.getAll(`conversations_${username}`);

    const queries = [];
    conversationsIds.forEach(id => queries.push(db.get(`conversations_${id}`)));

    const conversations = Promise.all(queries);

    return conversations;
}

async function isSuchPrivateAlreadyExist(conversation) {
    const conversations = await getAllConversations(conversation.users[0]);

    return conversations.some(elem =>
        (elem.isPrivate &&
            elem.users.find(user => user === conversation.users[0]) &&
            elem.users.find(user => user === conversation.users[1]))
    );
}

async function areUsersExist(users) {
    const queries = [];
    users.forEach(user => queries.push(db.get(`users_${user}`)));

    try {
        await Promise.all(queries);
    } catch (ex) {
        return false;
    }

    return true;
}

async function addConversationToUsers(conversation) {
    const queries = [];
    conversation.users.forEach(user =>
        queries.push(db.post(`conversations_${user}`, conversation.id))
    );

    await Promise.all(queries);
}
