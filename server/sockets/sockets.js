module.exports.configureIo = (io) => {
    io.on('connection', socket => {
        socket.on('message', (data) => {
            const message = { author: data.user, date: new Date(), text: data.text };
            socket.broadcast.emit(`message_${data.conversationId}`, message);
            socket.emit(`message_${data.conversationId}`, message);
        });
    });
};
