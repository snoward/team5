const { contacts, add } = require('../controllers/contacts');
const { messages, save } = require('../controllers/messages');
const { conversations, create } = require('../controllers/conversations');
const avatar = require('../controllers/avatar');

module.exports = (server) => {
    server.route('/api/contacts').get(contacts);
    server.route('/api/contacts/:id/:username').post(add);

    server.route('/api/conversations').get(conversations);
    server.route('/api/conversations/:title').post(create);

    server.route('/api/messages/:conversationId')
        .get(messages)
        .post(save);

    server
        .get('/api/avatar/:id?', avatar);

};
