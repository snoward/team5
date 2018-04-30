import axios from 'axios';

function saveMessage(message, conversationId) {
    return axios.post(`api/messages/${conversationId}`, message,
        { withCredentials: true, responseType: 'json' });
}

function getMessages(conversationId) {
    return axios.get(`api/messages/${conversationId}`, { withCredentials: true });
}

export { saveMessage, getMessages };
