const casual = require('casual');

const Conversation = require('../server/models/conversation');
const Message = require('../server/models/message');
const Contact = require('../server/models/contact');
const db = require('../server/libs/dbHelper');

const users = [
    'danmerus',
    'snoward',
    'Ftlka',
    'whoe',
    'akulin',
    'Dan1elNeal',
    'darl0ck'
];
const initialMessagesCount = 10;

async function createUsers() {
    for (const user of users) {
        await db.put(`users_${user}`, '');
    }
}

async function addContactsToUser(user, contacts) {
    for (const username of contacts) {
        const contact = new Contact({ username });
        await db.post(`contacts_${user}`, JSON.stringify(contact));
    }
}

async function createConversation() {
    const conversation = new Conversation({
        id: casual.uuid,
        title: casual.title,
        users: users
    });

    await db.post(`conversations_${conversation.id}`, JSON.stringify(conversation));
    for (const user of users) {
        await db.post(`conversations_${user}`, conversation.id);
    }

    return conversation;
}

async function createMessages(conversationId, messagesCount) {
    while (messagesCount) {
        const author = users[casual.integer(0, users.length - 1)];
        const message = new Message({
            author,
            text: casual.sentence
        });

        await db.post(`messages_${conversationId}`, JSON.stringify(message));
        messagesCount--;
    }
}

async function dropTables(tableNames) {
    for (const tableName of tableNames) {
        for (const user of users) {
            await db.delete(`${tableName}_${user}`);
        }
    }
}

async function configureStorage() {
    await dropTables(['contacts', 'users', 'conversations']);
    await createUsers();
    for (const user of users) {
        const contacts = users.filter(username => username !== user);
        await addContactsToUser(user, contacts);
    }
    const conversation = await createConversation();
    await createMessages(conversation.id, initialMessagesCount);
}

configureStorage().then(() => console.info('База данных успешно заполнена'));
