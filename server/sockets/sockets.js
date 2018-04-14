const extractor = require('../libs/urlMetadataExtractor');

module.exports.configureIo = (io) => {
    io.on('connection', socket => {

        socket.on('message', async (data) => {
            const message = {
                author: data.user,
                date: new Date(),
                text: data.text,
                metadata: await extractor.extractFromText(data.text)
            };
            socket.broadcast.emit(`message_${data.conversationId}`, message);
            socket.emit(`message_${data.conversationId}`, message);
        });

        socket.on('conversation', (data) => {
            const conversation = data.conversation;
            socket.broadcast.emit(`conversation_${data.addedUser}`, conversation);
        });
    });
};
