import axios from 'axios';

export function getContacts(req) {
    return axios.get('http://localhost:3000/api/contacts', req);
}

export function createContact(contactName) {
    return axios.post(`api/contacts/${contactName}`, {},
        { withCredentials: true, responseType: 'json', validateStatus: () => true });
}
