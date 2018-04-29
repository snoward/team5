import axios from 'axios';

function getConversations(req) {
    return axios.get('http://localhost:3000/api/conversations', req);
}

function getContacts(req) {
    return axios.get('http://localhost:3000/api/contacts', req);
}

function getRecentEmoji() {
    return axios.get('/api/emoji', { withCredentials: true });
}

function updateRecentEmoji(recentEmoji) {
    return axios.patch('/api/emoji', { recentEmoji }, { withCredentials: true });
}

function saveMessage(message, conversationId) {
    return axios.post(`api/messages/${conversationId}`, message,
        { withCredentials: true, responseType: 'json' });
}

function createContact(contactName) {
    return axios.post(`api/contacts/${contactName}`, {},
        { withCredentials: true, responseType: 'json', validateStatus: () => true });
}

function createPrivateConversation(user1, user2) {
    return axios.post('api/conversations/privateDialogue',
        { users: [user1, user2], isPrivate: true },
        { withCredentials: true, responseType: 'json', validateStatus: () => true });
}

function addUserInConversation(conversationId, user) {
    return axios.patch(`api/conversations/${conversationId}`,
        { username: user },
        { withCredentials: true, responseType: 'json', validateStatus: () => true });
}

function getConversationInfo(conversationId) {
    return axios.get(`api/conversations/${conversationId}`,
        { withCredentials: true, responseType: 'json' });
}

function createNotPrivateConversation(conversationName, users) {
    return axios.post(`api/conversations/${conversationName}`,
        { users: users, isPrivate: false },
        { withCredentials: true, responseType: 'json' });
}

function getMessages(conversationId) {
    return axios.get(`api/messages/${conversationId}`, { withCredentials: true });
}

function uploadImage(file) {
    /* eslint-disable-next-line */
    const formData = new FormData();
    formData.append('image', file);

    const options = {
        url: '/api/images/',
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: formData,
        withCredentials: true,
        validateStatus: () => true
    };

    return axios(options);
}

export { getConversations, getContacts, getRecentEmoji, updateRecentEmoji, saveMessage,
    createContact, createPrivateConversation, addUserInConversation, getConversationInfo,
    createNotPrivateConversation, uploadImage, getMessages };
