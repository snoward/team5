const ErrorInfo = require('../models/errorInfo');
const Conversation = require('../models/schemas/conversation');
const User = require('../models/schemas/user');

module.exports.conversations = async (req, res) => {
    const conversations = await getAllConversations(req.user.username);
    res.json(conversations);
};

module.exports.getInfo = async (req, res) => {
    const conversation = await Conversation.findById(req.params.conversationId);
    res.json(conversation);
};

module.exports.create = async (req, res) => {
    const users = await Promise.all(req.body.users.map(username => User.ensureExists(username)));
    if (users.some(user => user === null)) {
        return res.status(400).json({
            error: new ErrorInfo(400, 'Incorrect users')
        });
    }

    let conversation = {
        title: req.params.title,
        users: req.body.users,
        isPrivate: req.body.isPrivate
    };

    if (conversation.isPrivate && await isSuchPrivateAlreadyExist(conversation)) {
        return res.status(400).json({
            error: new ErrorInfo(400, 'Such private conversation already exist')
        });
    }

    try {
        conversation = await Conversation.create(conversation);
    } catch (ex) {
        return res.status(500).json({
            error: new ErrorInfo(400, 'Server error')
        });
    }

    res.status(201).json(conversation);
};

module.exports.addUser = async (req, res) => {
    const conversationId = req.params.conversationId;
    const { username } = req.body;

    const user = await User.ensureExists(username);
    if (!user) {
        return res.status(404).json({
            error: new ErrorInfo(404, `User ${username} not found`)
        });
    }

    const conversation = await Conversation.findOne({ _id: conversationId });
    if (conversation.users.includes(username)) {
        return res.status(400).json({
            error: new ErrorInfo(400, `User ${username} already in conversation`)
        });
    }

    if (conversation.isPrivate) {
        return res.status(400).json({
            error: new ErrorInfo(400, 'Cannot add user in private conversation')
        });
    }

    conversation.users.push(username);
    try {
        await conversation.save();
    } catch (ex) {
        return res.status(500).json({
            error: new Error(500, 'Server error')
        });
    }

    res.status(201).json(conversation);
};

async function getAllConversations(username) {
    const conversations = await Conversation.find({ users: username });

    return conversations;
}

async function isSuchPrivateAlreadyExist(conversation) {
    const conversations = await Conversation.find()
        .where({ isPrivate: true, users: conversation.users });

    return conversations.length;
}
