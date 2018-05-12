const ErrorInfo = require('../models/errorInfo');
const MessageFactory = require('../models/Message/MessageFactory/MessageFactory');
const Message = require('../models/schemas/message');
const Conversation = require('../models/schemas/conversation');

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

    Conversation.findByIdAndUpdate(message.conversationId, { updatedAt: new Date() }).exec();

    try {
        message = await Message.create(message);
    } catch (ex) {
        return res.status(500).json({
            error: new ErrorInfo(500, 'Не удалось отправить сообщение')
        });
    }

    res.status(201).json(message);
};
