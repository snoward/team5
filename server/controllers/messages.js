const ErrorInfo = require('../models/errorInfo');
const MessageFactory = require('../models/Message/MessageFactory/MessageFactory');
const Message = require('../models/schemas/message');

module.exports.messages = async (req, res) => {
    let messages;
    try {
        messages = await Message.find().where({ conversationId: req.params.conversationId });
    } catch (ex) {
        console.error(ex);
    }
    res.json(messages);
};

module.exports.save = async (req, res) => {
    let message = await MessageFactory.create(req.body);
    try {
        message = await Message.create(message);
    } catch (ex) {
        return res.status(500).json({
            error: new ErrorInfo(500, 'Server error')
        });
    }

    res.status(201).json(message);
};
