const MessageFactory = require('../models/Message/MessageFactory/MessageFactory');

module.exports.configureIo = (io) => {
    io.on('connection', socket => {
        socket.on('message', async (data) => {
            const message = await MessageFactory.create(data);
            socket.broadcast.emit(`message_${data.conversationId}`, message);
            socket.emit(`message_${data.conversationId}`, message);
        });

        socket.on('conversationNewUser', (data) => {
            const conversation = data.conversation;
            socket.broadcast.emit(`conversationNewUser_${data.addedUser}`, conversation);
        });

        socket.on('newConversation', (conversation) => {
            for (const user of conversation.users) {
                socket.broadcast.emit(`conversationNewUser_${user}`, conversation);
            }
        });
    });
};
