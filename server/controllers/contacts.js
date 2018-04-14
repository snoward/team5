const db = require('../libs/dbHelper');

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
        return res.status(404).send(`User ${contact.username} not found`);
    }

    try {
        await db.post(`contacts_${req.user.username}`, JSON.stringify(contact));
    } catch (ex) {
        console.error(`Can't create contact ${contact}. Exception: ${ex}`);

        return res.sendStatus(500);
    }

    res.status(201).send(contact);
};
