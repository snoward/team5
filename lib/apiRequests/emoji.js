import axios from 'axios';

export function getRecentEmoji() {
    return axios.get('/api/emoji', { withCredentials: true });
}

export function updateRecentEmoji(recentEmoji) {
    return axios.patch('/api/emoji', { recentEmoji }, { withCredentials: true });
}
