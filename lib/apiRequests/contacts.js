import axios from 'axios';

function getContacts(req) {
    return axios.get('http://localhost:3000/api/contacts', req);
}

function createContact(contactName) {
    return axios.post(`api/contacts/${contactName}`, {},
        { withCredentials: true, responseType: 'json', validateStatus: () => true });
}

export { getContacts, createContact };
