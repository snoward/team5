import axios from 'axios';

export function saveMessage(message, conversationId) {
    return axios.post(`api/messages/${conversationId}`, message,
        { withCredentials: true, responseType: 'json' });
}

export function getMessages(conversationId) {
    return axios.get(`api/messages/${conversationId}`, { withCredentials: true });
}
