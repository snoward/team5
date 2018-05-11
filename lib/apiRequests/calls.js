import axios from 'axios';

export function getCalls() {
    return axios.get('/api/calls', { withCredentials: true, responseType: 'json' });
}

export function registerCall(phoneNumber, callTime) {
    return axios.post('/api/calls',
        { phoneNumber, callTime, dispatchTime: new Date() },
        { withCredentials: true, responseType: 'json', validateStatus: () => true });
}

export function cancelCall(_id) {
    return axios.patch('/api/calls',
        { _id },
        { withCredentials: true, responseType: 'json', validateStatus: () => true });
}
