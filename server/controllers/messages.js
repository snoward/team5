const db = require('../libs/dbHelper');
const extractor = require('../libs/urlMetadataExtractor');
const ErrorInfo = require('../models/errorInfo');

module.exports.messages = async (req, res) => {
    const messages = await db.getAll(`messages_${req.params.conversationId}`);
    res.json(messages);
};

module.exports.save = async (req, res) => {
    const message = {
        author: req.user.username,
        date: new Date(),
        text: req.body.text,
        metadata: await extractor.extractFromText(req.body.text)
    };

    try {
        await db.post(`messages_${req.params.conversationId}`, JSON.stringify(message));
    } catch (ex) {
        return res.status(500).json({
            error: new ErrorInfo(500, 'Server error')
        });
    }

    res.status(201).json(message);
};
