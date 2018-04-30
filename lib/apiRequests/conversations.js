import axios from 'axios';

export function getConversations(req) {
    return axios.get('http://localhost:3000/api/conversations', req);
}

export function createPrivateConversation(user1, user2) {
    return axios.post('api/conversations/privateDialogue',
        { users: [user1, user2], isPrivate: true },
        { withCredentials: true, responseType: 'json', validateStatus: () => true });
}

export function addUserToConversation(conversationId, user) {
    return axios.patch(`api/conversations/${conversationId}`,
        { username: user },
        { withCredentials: true, responseType: 'json', validateStatus: () => true });
}

export function getConversationInfo(conversationId) {
    return axios.get(`api/conversations/${conversationId}`,
        { withCredentials: true, responseType: 'json' });
}

export function createNotPrivateConversation(conversationName, users) {
    return axios.post(`api/conversations/${conversationName}`,
        { users: users, isPrivate: false },
        { withCredentials: true, responseType: 'json' });
}
