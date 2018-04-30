import axios from 'axios';

function getRecentEmoji() {
    return axios.get('/api/emoji', { withCredentials: true });
}

function updateRecentEmoji(recentEmoji) {
    return axios.patch('/api/emoji', { recentEmoji }, { withCredentials: true });
}

export { getRecentEmoji, updateRecentEmoji };
