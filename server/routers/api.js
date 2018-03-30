const { contacts, add } = require('../controllers/contacts');
const { send } = require('../controllers/messages');
const { conversations } = require('../controllers/conversations');
const avatar = require('../controllers/avatar');

module.exports = (server) => {
    server
        .route('/api/messages')
        .post(send);

    server.route('/api/contacts').get(contacts);
    server.route('/api/contacts/:id/:username').post(add);

    server
        .route('/api/conversations/:conversationId')
        .get(conversations);

    server
        .get('/api/avatar/:id?', avatar);

};
