const db = require('../libs/dbHelper');
const ErrorInfo = require('../models/errorInfo');
const MessageFactory = require('../models/Message/MessageFactory/MessageFactory');

module.exports.messages = async (req, res) => {
    const messages = await db.getAll(`messages_${req.params.conversationId}`);
    res.json(messages);
};

module.exports.save = async (req, res) => {
    const message = await MessageFactory.create(req.body);

    try {
        await db.post(`messages_${req.params.conversationId}`, JSON.stringify(message));
    } catch (ex) {
        return res.status(500).json({
            error: new ErrorInfo(500, 'Server error')
        });
    }

    res.status(201).json(message);
};
