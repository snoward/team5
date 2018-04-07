const db = require('../libs/dbHelper');

module.exports.contacts = async (req, res) => {
    const contacts = await db.getAll(`contacts_${req.user.id}`);
    res.json(contacts);
};

module.exports.add = async (req, res) => {
    const contact = {
        id: req.params.id,
        username: req.params.username
    };

    try {
        await db.post(`contacts_${req.user.id}`, JSON.stringify(contact));
    } catch (ex) {
        console.error(`Can't create contact ${contact}. Exception: ${ex}`);

        return res.sendStatus(500);
    }

    res.sendStatus(201);
};
