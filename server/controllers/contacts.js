const db = require('../libs/dbHelper');
const ErrorInfo = require('../models/errorInfo');

module.exports.contacts = async (req, res) => {
    const contacts = await db.getAll(`contacts_${req.user.username}`);
    res.json(contacts);
};

module.exports.add = async (req, res) => {
    const contact = {
        username: req.params.username
    };

    try {
        await db.get(`users_${contact.username}`);
    } catch (ex) {
        return res.status(404).json({
            error: new ErrorInfo(404, `User ${contact.username} not found`) });
    }

    if (await isContactAlreadyExist(req.user.username, contact)) {
        return res.status(400).json({
            error: new ErrorInfo(400, `Contact ${contact.username} already exist`)
        });
    }

    try {
        await db.post(`contacts_${req.user.username}`, JSON.stringify(contact));
    } catch (ex) {
        return res.status(500).json({
            error: new ErrorInfo(500, 'Server error')
        });
    }

    res.status(201).json(contact);
};

async function isContactAlreadyExist(username, contact) {
    const contacts = await db.getAll(`contacts_${username}`);
    contact = JSON.stringify(contact);

    return contacts.some(el => el === contact);
}
