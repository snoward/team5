const db = require('../libs/dbHelper');
const extractor = require('../libs/urlMetadataExtractor');

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
        console.error(`Can't send message. Exception: ${ex}`);

        return res.sendStatus(500);
    }

    res.status(201).send(message);
};
