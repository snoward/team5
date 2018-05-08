const ErrorInfo = require('../models/errorInfo');
const Contact = require('../models/schemas/contact');
const User = require('../models/schemas/user');

module.exports.contacts = async (req, res) => {
    let contactsInfo;
    try {
        contactsInfo = await Contact.findOne({ ownerName: req.user.username });
    } catch (ex) {
        console.error(ex);
    }
    res.json(contactsInfo ? contactsInfo.contacts : []);
};

module.exports.add = async (req, res) => {
    const additionResult = await tryAddContact(req.user.username, req.params.username);
    if (additionResult.error) {
        return res.status(additionResult.error.status).json({ error: additionResult.error });
    }
    res.status(201).json(additionResult.addedContact);
};

async function tryAddContact(username, contactName) {
    if (username === contactName) {
        return { error: new ErrorInfo(400, 'Нельзя добавить себя в контакты') };
    }

    const user = await User.ensureExists(contactName);
    if (!user) {
        return { error: new ErrorInfo(404, 'Пользователь не найден') };
    }

    const contactInfo = await Contact.findOneOrCreate(username);
    const addedContact = contactInfo.addContact(contactName);
    if (!addedContact) {
        return { error: new ErrorInfo(400, 'Такой контакт уже существует') };
    }
    await contactInfo.save();

    return { error: null, addedContact };
}

module.exports.tryAddContact = tryAddContact;
