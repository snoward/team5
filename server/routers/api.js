const { contacts, add } = require('../controllers/contacts');
const { messages, save } = require('../controllers/messages');
const { conversations, create, addUser, getInfo } = require('../controllers/conversations');
const { user } = require('../controllers/users');
const avatar = require('../controllers/avatar');
const hasNotSignedIn = require('../middlewares/has-not-signed-in');

module.exports = (server) => {
    server.use('/api/', hasNotSignedIn((req, res) => res.send(401)));

    server.route('/api/contacts').get(contacts);
    server.route('/api/contacts/:username').post(add);

    server.route('/api/conversations').get(conversations);
    server.route('/api/conversations/:title').post(create);
    server.route('/api/conversations/:conversationId')
        .patch(addUser)
        .get(getInfo);

    server.route('/api/messages/:conversationId')
        .get(messages)
        .post(save);

    server
        .get('/api/avatar/:id?', avatar);

    server.route('/api/users/:username').get(user);

};
